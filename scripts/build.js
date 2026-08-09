// build.js developed by Bob Tianqi Wei
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const baseSiteConfig = require(path.join(repoRoot, "content", "site.js"));
const englishContent = require(path.join(repoRoot, "content", "en.js"));
const projectsDir = path.join(repoRoot, "content", "projects");
let activeLocale = "zh";
let siteConfig = baseSiteConfig;

const uiCopy = {
  zh: {
    htmlLang: "zh-CN",
    loading: "加载中...",
    news: "动态",
    loadingUpdates: "正在加载...",
    profile: "个人资料",
    quickLinks: "快速链接",
    contact: "联系方式",
    about: "关于我",
    relatedProfiles: "相关主页",
    selectedProjects: "代表项目",
    selectedPublications: "代表论文",
    moreWork: "更多作品",
    name: "姓名",
    title: "身份",
    affiliation: "学校",
    location: "地点",
    focus: "方向",
    availability: "交流",
    browse: "浏览",
    intro: "简介",
    publications: "学术论文",
    projects: "项目",
    home: "首页",
    backHome: "返回首页",
    pageMenu: "页面目录",
    workInfo: "作品信息",
    workTitle: "标题",
    category: "类别",
    publication: "学术论文",
    project: "项目",
    type: "类型",
    role: "角色",
    collaborators: "合作者",
    atGlance: "一览",
    publicationDetails: "论文详情",
    authors: "作者",
    venueStatus: "期刊／状态",
    year: "年份",
    citation: "引用",
    abstract: "摘要",
    previousSlide: "上一张",
    nextSlide: "下一张",
    slideLabel: (index) => `转到第 ${index} 张`,
    aboutHeadline: "关于我",
    publicationsDescription: "围绕科学计量、复杂网络、学术合作与智慧养老研究开展的论文工作。",
    projectsDescription: "面向科研情报、人才政策、数据可视化与远程工作的系统项目。"
  },
  en: {
    htmlLang: "en",
    loading: "Loading...",
    news: "News",
    loadingUpdates: "Loading updates...",
    profile: "Profile",
    quickLinks: "Quick links",
    contact: "Contact",
    about: "About",
    relatedProfiles: "Online profiles",
    selectedProjects: "Selected projects",
    selectedPublications: "Selected publications",
    moreWork: "More work",
    name: "Name",
    title: "Title",
    affiliation: "Affiliation",
    location: "Location",
    focus: "Focus",
    availability: "Collaboration",
    browse: "Browse",
    intro: "Introduction",
    publications: "Publications",
    projects: "Projects",
    home: "Home",
    backHome: "Back to home",
    pageMenu: "On this page",
    workInfo: "Work information",
    workTitle: "Title",
    category: "Category",
    publication: "Publication",
    project: "Project",
    type: "Type",
    role: "Role",
    collaborators: "Collaborators",
    atGlance: "At a glance",
    publicationDetails: "Publication details",
    authors: "Authors",
    venueStatus: "Venue / status",
    year: "Year",
    citation: "Citation",
    abstract: "Abstract",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    slideLabel: (index) => `Go to slide ${index}`,
    aboutHeadline: "About",
    publicationsDescription: "Research on scientometrics, complex networks, academic collaboration, and smart senior care.",
    projectsDescription: "Information systems for research intelligence, talent policy, data visualization, and remote work."
  }
};

function deepMerge(base, overrides) {
  if (Array.isArray(overrides)) {
    return overrides.map((item) =>
      item && typeof item === "object" ? deepMerge({}, item) : item
    );
  }

  if (!overrides || typeof overrides !== "object") {
    return overrides === undefined ? base : overrides;
  }

  const result = { ...(base || {}) };

  Object.entries(overrides).forEach(([key, value]) => {
    result[key] =
      value && typeof value === "object" && !Array.isArray(value)
        ? deepMerge(result[key], value)
        : Array.isArray(value)
          ? deepMerge([], value)
          : value;
  });

  return result;
}

function loadProjects(locale) {
  const projects = fs
    .readdirSync(projectsDir)
    .filter((fileName) => fileName.endsWith(".js") && !fileName.startsWith("_"))
    .sort()
    .map((fileName) => require(path.join(projectsDir, fileName)));

  if (locale !== "en") {
    return projects;
  }

  return projects.map((project) =>
    deepMerge(project, englishContent.projects[project.slug] || {})
  );
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(relativePath, content) {
  const outputPath = path.join(repoRoot, relativePath);
  ensureDir(outputPath);
  fs.writeFileSync(outputPath, content);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getPrefix(relativePath) {
  const outputDir = path.dirname(path.join(repoRoot, relativePath));
  const relative = path.relative(outputDir, repoRoot).replace(/\\/g, "/");
  return relative || ".";
}

function resolveHref(relativePath, href) {
  if (/^(https?:|mailto:|#)/.test(href)) {
    return href;
  }

  const prefix = getPrefix(relativePath);
  return `${prefix}/${href}`.replace(/\/\.\//g, "/");
}

function resolveAsset(relativePath, assetPath) {
  const prefix = getPrefix(relativePath);
  return `${prefix}/${assetPath}`.replace(/\/\.\//g, "/");
}

function localizePath(relativePath) {
  if (activeLocale === "en" && !/^(https?:|mailto:|#)/.test(relativePath)) {
    return `en/${relativePath}`;
  }

  return relativePath;
}

function resolveSiteHref(relativePath, href) {
  return resolveHref(relativePath, localizePath(href));
}

function getCanonicalPagePath(relativePath) {
  return relativePath.startsWith("en/") ? relativePath.slice(3) : relativePath;
}

function getLocalePagePath(relativePath, locale) {
  const canonicalPath = getCanonicalPagePath(relativePath);
  return locale === "en" ? `en/${canonicalPath}` : canonicalPath;
}

function renderLanguageHead(relativePath) {
  const zhHref = resolveHref(relativePath, getLocalePagePath(relativePath, "zh"));
  const enHref = resolveHref(relativePath, getLocalePagePath(relativePath, "en"));
  const alternateHref = activeLocale === "en" ? zhHref : enHref;

  return `  <link rel="alternate" hreflang="zh-CN" href="${escapeHtml(zhHref)}">
  <link rel="alternate" hreflang="en" href="${escapeHtml(enHref)}">
  <script>(function(){try{var saved=localStorage.getItem("retroframe-language");var preferred=saved||"en";if(preferred!==${JSON.stringify(
    activeLocale
  )}){location.replace(${JSON.stringify(alternateHref)});}}catch(error){}})();</script>`;
}

function renderLanguageSwitch(relativePath) {
  const zhHref = resolveHref(relativePath, getLocalePagePath(relativePath, "zh"));
  const enHref = resolveHref(relativePath, getLocalePagePath(relativePath, "en"));

  return `<div class="language-switch" aria-label="Language">
  <a href="${escapeHtml(zhHref)}" lang="zh-CN" data-language="zh"${
    activeLocale === "zh" ? ' aria-current="page"' : ""
  }>中文</a>
  <span aria-hidden="true">/</span>
  <a href="${escapeHtml(enHref)}" lang="en" data-language="en"${
    activeLocale === "en" ? ' aria-current="page"' : ""
  }>EN</a>
</div>`;
}

function renderSocialMeta(relativePath, title, description) {
  const image = siteConfig.site.siteUrl
    ? new URL("assets/images/og.png", siteConfig.site.siteUrl).href
    : resolveAsset(relativePath, "assets/images/og.png");

  return `  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <link rel="icon" href="${escapeHtml(resolveAsset(relativePath, "assets/images/kaiyi-mark.png"))}">`;
}

function renderNav(relativePath) {
  return `<div class="nav">
<div class="nav-links">
${siteConfig.navLinks
  .map(
    (link) =>
      `  <a href="${escapeHtml(resolveSiteHref(relativePath, link.href))}"${
        /^https?:/.test(link.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(link.label)}</a>`
  )
  .join("\n")}
</div>
${renderLanguageSwitch(relativePath)}
</div>`;
}

function renderTopbar(relativePath) {
  const copy = uiCopy[activeLocale];
  return `    <div class="topbar">
      <a class="topbar-link" href="${escapeHtml(siteConfig.topbar.latestBlogHref)}">${escapeHtml(siteConfig.topbar.latestBlogLabel)}</a>
      <span class="topbar-item"><span class="topbar-text">${escapeHtml(siteConfig.topbar.prefix)}${activeLocale === "zh" ? "：" : ":"}</span><img class="topbar-icon" id="local-weather-icon" src="https://cdn.jsdelivr.net/gh/basmilius/weather-icons/production/fill/all/partly-cloudy-day.svg" alt=""><span id="local-status">${copy.loading}</span></span>
    </div>`;
}

function renderFooter(relativePath) {
  return `    <div class="footer">${escapeHtml(
    siteConfig.site.footerLabel
  )} <a href="${escapeHtml(
    resolveHref(relativePath, siteConfig.site.footerLinkHref)
  )}" target="_blank" rel="noreferrer">${escapeHtml(
    siteConfig.site.footerLinkLabel
  )}</a>${siteConfig.site.footerSuffix ? ` ${escapeHtml(siteConfig.site.footerSuffix)}` : ""}</div>`;
}

function renderParagraphs(paragraphs) {
  return paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function renderList(items, className) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  return `<ul class="${escapeHtml(className)}">
${items.map((item) => `  <li>${escapeHtml(item)}</li>`).join("\n")}
</ul>`;
}

function renderIntroContent() {
  return `<div class="intro-copy">${renderParagraphs(siteConfig.introParagraphs || [])}</div>`;
}

function renderPublicationMeta(project) {
  if (project.type !== "publication" || !project.publication) {
    return "";
  }

  const publication = project.publication;
  const copy = uiCopy[activeLocale];

  return `<div class="publication-meta">
  ${publication.authors ? `<p><strong>${copy.authors}:</strong> ${escapeHtml(publication.authors)}</p>` : ""}
  ${publication.venue ? `<p><strong>${copy.venueStatus}:</strong> ${escapeHtml(publication.venue)}</p>` : ""}
  ${publication.year ? `<p><strong>${copy.year}:</strong> ${escapeHtml(publication.year)}</p>` : ""}
  ${publication.doi ? `<p><strong>DOI:</strong> <a href="https://doi.org/${escapeHtml(publication.doi)}" target="_blank" rel="noreferrer">${escapeHtml(publication.doi)}</a></p>` : ""}
  ${publication.citation ? `<p><strong>${copy.citation}:</strong> ${escapeHtml(publication.citation)}</p>` : ""}
  ${publication.abstract ? `<p><strong>${copy.abstract}:</strong> ${escapeHtml(publication.abstract)}</p>` : ""}
</div>`;
}

function renderFigure(relativePath, image) {
  if (!image) {
    return "";
  }

  return `<figure class="project-figure">
  <img src="${escapeHtml(resolveAsset(relativePath, image.src))}" loading="lazy" alt="${escapeHtml(
    image.alt || ""
  )}" class="project-gallery-image">
  ${
    image.caption
      ? `<figcaption class="image-description">${escapeHtml(image.caption)}</figcaption>`
      : ""
  }
</figure>`;
}

function renderGallery(relativePath, items) {
  if (!Array.isArray(items) || !items.length) {
    return "";
  }

  const copy = uiCopy[activeLocale];

  return `<div class="classic-slider" data-classic-slider>
  <div class="classic-slider-frame">
${items
  .map(
    (item, index) => `    <div class="classic-slide${index === 0 ? " is-active" : ""}">
      <img src="${escapeHtml(resolveAsset(relativePath, item.src))}" loading="lazy" alt="${escapeHtml(
      item.alt || ""
    )}" class="project-gallery-image">
    </div>`
  )
  .join("\n")}
  </div>
  <button type="button" class="classic-slider-arrow classic-slider-prev" data-classic-slider-prev aria-label="${copy.previousSlide}">&#8249;</button>
  <button type="button" class="classic-slider-arrow classic-slider-next" data-classic-slider-next aria-label="${copy.nextSlide}">&#8250;</button>
  <div class="classic-slider-dots">
${items
  .map(
    (_, index) =>
      `    <button type="button" class="classic-slider-dot${
        index === 0 ? " is-active" : ""
      }" data-classic-slider-dot="${index}" aria-label="${escapeHtml(copy.slideLabel(index + 1))}"></button>`
  )
  .join("\n")}
  </div>
</div>`;
}

function renderCollectionRows(relativePath, items, showThumbnails) {
  return items
    .map((project) => {
      if (showThumbnails) {
        return `                <tr>
                  <td class="thumb"><a href="${escapeHtml(
                    resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                  )}"><img src="${escapeHtml(resolveAsset(relativePath, project.thumbnail))}" alt="${escapeHtml(
          project.thumbnailAlt
        )}"></a></td>
                  <td>
                    <p class="project-title"><a href="${escapeHtml(
                      resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                    )}">${escapeHtml(project.title)}</a></p>
                    <p class="project-meta">${escapeHtml(project.meta)}</p>
                    <p>${escapeHtml(project.summary)}</p>
                  </td>
                </tr>`;
      }

      return `                <tr>
                  <td><p class="project-title"><a href="${escapeHtml(
                    resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                  )}">${escapeHtml(project.title)}</a></p><p class="project-meta">${escapeHtml(project.meta)}</p>${
                    project.publication
                      ? `<p class="project-submeta">${escapeHtml(
                          [project.publication.authors, project.publication.venue]
                            .filter(Boolean)
                            .join(" | ")
                        )}</p>`
                      : ""
                  }<p>${escapeHtml(project.summary)}</p></td>
                </tr>`;
    })
    .join("\n");
}

function renderHome(relativePath, projects) {
  const featuredProjects = projects
    .filter((project) => project.featured && project.type !== "publication")
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
  const featuredPublications = projects
    .filter((project) => project.featured && project.type === "publication")
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
  const selectedProjects = projects
    .filter((project) => project.selected && project.type !== "publication")
    .sort((a, b) => a.selectedOrder - b.selectedOrder);
  const selectedPublications = projects
    .filter((project) => project.selected && project.type === "publication")
    .sort((a, b) => a.selectedOrder - b.selectedOrder);
  const moreWorkItems = projects.filter((project) => project.slug === "devspace");
  const copy = uiCopy[activeLocale];

  return `<!-- index.html developed by Bob Tianqi Wei -->
<!DOCTYPE html>
<html lang="${copy.htmlLang}" data-locale="${activeLocale}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(siteConfig.site.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(siteConfig.site.metaDescription)}">
${renderSocialMeta(relativePath, siteConfig.site.metaTitle, siteConfig.site.metaDescription)}
${renderLanguageHead(relativePath)}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="${escapeHtml(resolveAsset(relativePath, "assets/css/retroframe.css"))}" rel="stylesheet" type="text/css">
</head>
<body data-page="home">
  <div class="page">
${renderTopbar(relativePath)}
    <div class="banner">
      <h1>${escapeHtml(siteConfig.banner.title)}</h1>
      <p>${escapeHtml(siteConfig.banner.subtitle)}</p>
    </div>
${renderNav(relativePath)}
    <div class="best-viewed" aria-live="polite">
      <span class="best-viewed-label">${copy.news}</span>
      <span class="best-viewed-text" id="news-ticker">${copy.loadingUpdates}</span>
    </div>
    <table class="content">
      <tr>
        <td class="sidebar">
          <div class="box">
            <div class="box-title">${copy.quickLinks}</div>
            <div class="box-body">
              <ul class="plain-list quick-links-grid">
${siteConfig.quickLinks
  .map(
    (item) =>
      `                <li><a href="${escapeHtml(resolveSiteHref(relativePath, item.href))}"${
        /^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(item.label)}</a></li>`
  )
  .join("\n")}
              </ul>
            </div>
          </div>
          <div class="box" id="profile">
            <div class="box-title">${copy.profile}</div>
            <div class="box-body">
              <img class="profile-photo" src="${escapeHtml(
                resolveAsset(relativePath, siteConfig.profile.image)
              )}" alt="${escapeHtml(siteConfig.profile.imageAlt)}">
              <p><strong>${copy.name}:</strong> ${escapeHtml(siteConfig.profile.name)}</p>
              <p><strong>${copy.title}:</strong> ${escapeHtml(siteConfig.profile.title || "")}</p>
              <p><strong>${copy.affiliation}:</strong> ${escapeHtml(siteConfig.profile.affiliation || "")}</p>
              <p><strong>${copy.location}:</strong> ${escapeHtml(siteConfig.profile.location || "")}</p>
              <p><strong>${copy.focus}:</strong> ${escapeHtml(siteConfig.profile.focus)}</p>
              <p><strong>${copy.availability}:</strong> ${escapeHtml(siteConfig.profile.availability)}</p>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.contact}</div>
            <div class="box-body">
${siteConfig.contact
  .map(
    (item) =>
      `              <p><strong>${escapeHtml(item.label)}:</strong> <a href="${escapeHtml(
        resolveHref(relativePath, item.href)
      )}"${
        /^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(item.value)}</a></p>`
  )
  .join("\n")}
            </div>
          </div>
        </td>
        <td class="main">
          <div class="box" id="about">
            <div class="box-title">${copy.about}</div>
            <div class="box-body">
${renderIntroContent()}
            </div>
          </div>
          <div class="box" id="trusted">
            <div class="box-title">${copy.relatedProfiles}</div>
            <div class="box-body">
              <div class="trust-grid">
${siteConfig.trustedBy
  .map(
    (item) => `                <a class="trust-item" href="${escapeHtml(
      resolveHref(relativePath, item.href)
    )}" target="_blank" rel="noreferrer"><img${
      item.imageClass ? ` class="${escapeHtml(item.imageClass)}"` : ""
    } src="${escapeHtml(resolveAsset(relativePath, item.image))}" alt="${escapeHtml(item.name)}"></a>`
  )
  .join("\n")}
              </div>
            </div>
          </div>
          <div class="box" id="projects">
            <div class="box-title">${copy.selectedProjects}</div>
            <div class="box-body">
              <table class="feature-table">
${featuredProjects
  .map(
    (project) => `                <tr>
                  <td class="thumb"><a href="${escapeHtml(
                    resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                  )}"><img src="${escapeHtml(resolveAsset(relativePath, project.thumbnail))}" alt="${escapeHtml(
      project.thumbnailAlt
    )}"></a></td>
                  <td>
                    <p class="project-title"><a href="${escapeHtml(
                      resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                    )}">${escapeHtml(project.title)}</a></p>
                    <p class="project-meta">${escapeHtml(project.meta)}</p>
                    <p>${escapeHtml(project.summary)}</p>
                  </td>
                </tr>`
  )
  .join("\n")}
              </table>
            </div>
          </div>
          <div class="box" id="publications">
            <div class="box-title">${copy.selectedPublications}</div>
            <div class="box-body">
              <table class="project-table">
${featuredPublications
  .map(
    (project) => `                <tr>
                  <td><p class="project-title"><a href="${escapeHtml(
                    resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                  )}">${escapeHtml(project.title)}</a></p><p class="project-meta">${escapeHtml(project.meta)}</p>${
                    project.publication
                      ? `<p class="project-submeta">${escapeHtml(
                          [project.publication.authors, project.publication.venue]
                            .filter(Boolean)
                            .join(" | ")
                        )}</p>`
                      : ""
                  }<p>${escapeHtml(project.summary)}</p></td>
                </tr>`
  )
  .join("\n")}
              </table>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.moreWork}</div>
            <div class="box-body">
              <table class="project-table">
${moreWorkItems
  .map(
    (project) => `                <tr>
                  <td><p class="project-title"><a href="${escapeHtml(
                    resolveSiteHref(relativePath, `projects/${project.slug}/index.html`)
                  )}">${escapeHtml(project.title)}</a></p><p class="project-meta">${escapeHtml(project.meta)}</p>${
                    project.publication
                      ? `<p class="project-submeta">${escapeHtml(
                          [project.publication.authors, project.publication.venue]
                            .filter(Boolean)
                            .join(" | ")
                        )}</p>`
                      : ""
                  }<p>${escapeHtml(project.summary)}</p></td>
                </tr>`
  )
  .join("\n")}
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table>
${renderFooter(relativePath)}
  </div>
  <script>window.retroframeNewsItems = ${JSON.stringify(siteConfig.newsItems)};</script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/status-bar.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/home.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/language.js"))}" defer></script>
</body>
</html>
`;
}

function renderCollectionPage(relativePath, options) {
  const { title, description, items, kind } = options;
  const isPublicationPage = kind === "publications";
  const tableClass = isPublicationPage ? "project-table" : "feature-table";
  const copy = uiCopy[activeLocale];

  return `<!-- index.html developed by Bob Tianqi Wei -->
<!DOCTYPE html>
<html lang="${copy.htmlLang}" data-locale="${activeLocale}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(title)} | ${escapeHtml(siteConfig.site.title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
${renderSocialMeta(relativePath, `${title} | ${siteConfig.site.title}`, description)}
${renderLanguageHead(relativePath)}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="${escapeHtml(resolveAsset(relativePath, "assets/css/retroframe.css"))}" rel="stylesheet" type="text/css">
</head>
<body data-page="project" data-theme="slate-ice">
  <div class="page">
${renderTopbar(relativePath)}
${renderNav(relativePath)}
    <table class="content">
      <tr>
        <td class="sidebar">
          <div class="box">
            <div class="box-title">${copy.browse}</div>
            <div class="box-body mini-nav">
              <a href="${escapeHtml(resolveSiteHref(relativePath, "index.html#about"))}">${copy.intro}</a>
              <a href="${escapeHtml(resolveSiteHref(relativePath, "about/index.html"))}">${copy.about}</a>
              <a href="${escapeHtml(resolveSiteHref(relativePath, "publications/index.html"))}">${copy.publications}</a>
              <a href="${escapeHtml(resolveSiteHref(relativePath, "projects/index.html"))}">${copy.projects}</a>
              <a href="${escapeHtml(resolveSiteHref(relativePath, "index.html#profile"))}">${copy.contact}</a>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.quickLinks}</div>
            <div class="box-body">
              <ul class="plain-list">
                <li><a href="${escapeHtml(resolveSiteHref(relativePath, "index.html"))}">${copy.backHome}</a></li>
${siteConfig.quickLinks
  .map(
    (item) =>
      `                <li><a href="${escapeHtml(resolveSiteHref(relativePath, item.href))}"${
        /^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(item.label)}</a></li>`
  )
  .join("\n")}
              </ul>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.profile}</div>
            <div class="box-body">
              <p><strong>${copy.name}:</strong> ${escapeHtml(siteConfig.profile.name)}</p>
              <p><strong>${copy.title}:</strong> ${escapeHtml(siteConfig.profile.title || "")}</p>
              <p><strong>${copy.affiliation}:</strong> ${escapeHtml(siteConfig.profile.affiliation || "")}</p>
              <p><strong>${copy.focus}:</strong> ${escapeHtml(siteConfig.profile.focus)}</p>
            </div>
          </div>
        </td>
        <td class="main">
          <div class="project-header">
            <h1 class="project-header-title">${escapeHtml(title)}</h1>
            <p class="project-header-headline">${escapeHtml(description)}</p>
          </div>
          <div class="box">
            <div class="box-title">${escapeHtml(title)}</div>
            <div class="box-body">
              <table class="${tableClass}">
${renderCollectionRows(relativePath, items, !isPublicationPage)}
              </table>
            </div>
          </div>
        </td>
      </tr>
    </table>
${renderFooter(relativePath)}
  </div>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/status-bar.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/language.js"))}" defer></script>
</body>
</html>
`;
}

function renderAboutPage(relativePath) {
  const aboutConfig = siteConfig.aboutPage || { headline: "", sections: [] };
  const copy = uiCopy[activeLocale];
  const anchorLinks = (aboutConfig.sections || []).map((section, index) => ({
    id: section.id || `section-${index + 1}`,
    title: section.title
  }));

  return `<!-- index.html developed by Bob Tianqi Wei -->
<!DOCTYPE html>
<html lang="${copy.htmlLang}" data-locale="${activeLocale}">
<head>
  <meta charset="utf-8">
  <title>${copy.aboutHeadline} | ${escapeHtml(siteConfig.site.title)}</title>
  <meta name="description" content="${escapeHtml(siteConfig.site.metaDescription)}">
${renderSocialMeta(relativePath, `${copy.aboutHeadline} | ${siteConfig.site.title}`, siteConfig.site.metaDescription)}
${renderLanguageHead(relativePath)}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="${escapeHtml(resolveAsset(relativePath, "assets/css/retroframe.css"))}" rel="stylesheet" type="text/css">
</head>
<body data-page="project" data-theme="slate-ice">
  <div class="page">
${renderTopbar(relativePath)}
${renderNav(relativePath)}
    <table class="content">
      <tr>
        <td class="sidebar">
          <div class="box">
            <div class="box-title">${copy.browse}</div>
            <div class="box-body mini-nav">
              <a href="${escapeHtml(resolveSiteHref(relativePath, "index.html"))}">${copy.home}</a>
${anchorLinks
  .map((item) => `              <a href="#${escapeHtml(item.id)}">${escapeHtml(item.title)}</a>`)
  .join("\n")}
              <a href="${escapeHtml(resolveSiteHref(relativePath, "publications/index.html"))}">${copy.publications}</a>
              <a href="${escapeHtml(resolveSiteHref(relativePath, "projects/index.html"))}">${copy.projects}</a>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.quickLinks}</div>
            <div class="box-body">
              <ul class="plain-list">
                <li><a href="${escapeHtml(resolveSiteHref(relativePath, "index.html"))}">${copy.backHome}</a></li>
${siteConfig.quickLinks
  .map(
    (item) =>
      `                <li><a href="${escapeHtml(resolveSiteHref(relativePath, item.href))}"${
        /^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(item.label)}</a></li>`
  )
  .join("\n")}
              </ul>
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.profile}</div>
            <div class="box-body">
              <img class="profile-photo" src="${escapeHtml(
                resolveAsset(relativePath, siteConfig.profile.image)
              )}" alt="${escapeHtml(siteConfig.profile.imageAlt)}">
              <p><strong>${copy.name}:</strong> ${escapeHtml(siteConfig.profile.name)}</p>
              <p><strong>${copy.title}:</strong> ${escapeHtml(siteConfig.profile.title || "")}</p>
              <p><strong>${copy.affiliation}:</strong> ${escapeHtml(siteConfig.profile.affiliation || "")}</p>
              <p><strong>${copy.location}:</strong> ${escapeHtml(siteConfig.profile.location || "")}</p>
            </div>
          </div>
        </td>
        <td class="main">
          <div class="project-header">
            <h1 class="project-header-title">${copy.aboutHeadline}</h1>
            <p class="project-header-headline">${escapeHtml(aboutConfig.headline || "")}</p>
          </div>
${(aboutConfig.sections || [])
  .map((section, index) => {
    const sectionId = section.id || `section-${index + 1}`;
    return `          <div class="box" id="${escapeHtml(sectionId)}">
            <div class="box-title">${escapeHtml(section.title)}</div>
            <div class="box-body">
              <div class="project-richtext">${renderParagraphs(section.paragraphs || [])}</div>
            </div>
          </div>`;
  })
  .join("\n")}
        </td>
      </tr>
    </table>
${renderFooter(relativePath)}
  </div>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/status-bar.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/language.js"))}" defer></script>
</body>
</html>
`;
}

function renderProjectPage(project) {
  const relativePath = getLocalePagePath(`projects/${project.slug}/index.html`, activeLocale);
  const copy = uiCopy[activeLocale];
  const anchorLinks = project.page.sections.map((section, index) => ({
    id: section.id || `section-${index + 1}`,
    title: section.title
  }));

  return {
    relativePath,
    html: `<!-- index.html developed by Bob Tianqi Wei -->
<!DOCTYPE html>
<html lang="${copy.htmlLang}" data-locale="${activeLocale}">
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(project.title)} | ${escapeHtml(siteConfig.site.title)}</title>
  <meta name="description" content="${escapeHtml(project.summary)}">
${renderSocialMeta(relativePath, `${project.title} | ${siteConfig.site.title}`, project.summary)}
${renderLanguageHead(relativePath)}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="${escapeHtml(resolveAsset(relativePath, "assets/css/retroframe.css"))}" rel="stylesheet" type="text/css">
</head>
<body data-page="project" data-theme="slate-ice">
  <div class="page">
${renderTopbar(relativePath)}
${renderNav(relativePath)}
    <table class="content">
      <tr>
        <td class="sidebar">
          <div class="box">
            <div class="box-title">${copy.pageMenu}</div>
            <div class="box-body mini-nav">
              <a href="${escapeHtml(resolveSiteHref(relativePath, "index.html"))}">${copy.home}</a>
${anchorLinks
  .map((item) => `              <a href="#${escapeHtml(item.id)}">${escapeHtml(item.title)}</a>`)
  .join("\n")}
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.workInfo}</div>
            <div class="box-body">
              <p><strong>${copy.workTitle}:</strong> ${escapeHtml(project.title)}</p>
              <p><strong>${copy.category}:</strong> ${project.type === "publication" ? copy.publication : copy.project}</p>
              <p><strong>${copy.type}:</strong> ${escapeHtml(project.meta)}</p>
              <p><strong>${copy.focus}:</strong> ${escapeHtml(project.page.focus)}</p>
              ${
                project.page.role
                  ? `<p><strong>${copy.role}:</strong> ${escapeHtml(project.page.role)}</p>`
                  : ""
              }
              ${
                project.page.collaborators
                  ? `<p><strong>${copy.collaborators}:</strong> ${escapeHtml(project.page.collaborators)}</p>`
                  : ""
              }
            </div>
          </div>
          <div class="box">
            <div class="box-title">${copy.atGlance}</div>
            <div class="box-body">
              <p>${escapeHtml(siteConfig.profile.name)}</p>
              <p>${escapeHtml(project.page.stack)}</p>
              <p>${escapeHtml(project.date)}</p>
            </div>
          </div>
          ${
            project.type === "publication"
              ? `          <div class="box">
            <div class="box-title">${copy.publicationDetails}</div>
            <div class="box-body">
${renderPublicationMeta(project)}
            </div>
          </div>`
              : ""
          }
          <div class="box">
            <div class="box-title">${copy.quickLinks}</div>
            <div class="box-body">
              <ul class="plain-list">
                <li><a href="${escapeHtml(resolveSiteHref(relativePath, "index.html"))}">${copy.backHome}</a></li>
${(project.page.quickLinks || [])
  .map(
    (item) =>
      `                <li><a href="${escapeHtml(resolveSiteHref(relativePath, item.href))}"${
        /^https?:/.test(item.href) ? ' target="_blank" rel="noreferrer"' : ""
      }>${escapeHtml(item.label)}</a></li>`
  )
  .join("\n")}
              </ul>
            </div>
          </div>
        </td>
        <td class="main">
          <div class="project-header">
            <h1 class="project-header-title">${escapeHtml(project.title)}</h1>
            <p class="project-header-headline">${escapeHtml(project.page.headline)}</p>
          </div>
          <div class="project-hero-media">
            <figure class="project-figure">
              <img src="${escapeHtml(resolveAsset(relativePath, project.thumbnail))}" loading="lazy" alt="${escapeHtml(
      project.thumbnailAlt
    )}" class="project-gallery-image">
            </figure>
          </div>
${project.page.sections
  .map((section, index) => {
    const sectionId = section.id || `section-${index + 1}`;
    return `          <div class="box" id="${escapeHtml(sectionId)}">
            <div class="box-title">${escapeHtml(section.title)}</div>
            <div class="box-body">
              <div class="project-richtext">${renderParagraphs(section.paragraphs || [])}</div>
              ${section.image ? renderFigure(relativePath, section.image) : ""}
              ${section.gallery ? renderGallery(relativePath, section.gallery) : ""}
            </div>
          </div>`;
  })
  .join("\n")}
        </td>
      </tr>
    </table>
${renderFooter(relativePath)}
  </div>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/status-bar.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/project-page.js"))}" defer></script>
  <script src="${escapeHtml(resolveAsset(relativePath, "assets/js/language.js"))}" defer></script>
</body>
</html>
`
  };
}

function buildLocale(locale) {
  activeLocale = locale;
  siteConfig =
    locale === "en"
      ? deepMerge(baseSiteConfig, englishContent.site)
      : baseSiteConfig;

  const copy = uiCopy[locale];
  const projects = loadProjects(locale);
  const publications = projects.filter((project) => project.type === "publication");
  const projectItems = projects.filter((project) => project.type !== "publication");
  const homePath = getLocalePagePath("index.html", locale);
  const aboutPath = getLocalePagePath("about/index.html", locale);
  const publicationsPath = getLocalePagePath("publications/index.html", locale);
  const projectsPath = getLocalePagePath("projects/index.html", locale);

  writeFile(homePath, renderHome(homePath, projects));
  writeFile(aboutPath, renderAboutPage(aboutPath));
  writeFile(
    publicationsPath,
    renderCollectionPage(publicationsPath, {
      title: copy.publications,
      description: copy.publicationsDescription,
      items: publications,
      kind: "publications"
    })
  );
  writeFile(
    projectsPath,
    renderCollectionPage(projectsPath, {
      title: copy.projects,
      description: copy.projectsDescription,
      items: projectItems,
      kind: "projects"
    })
  );

  projects.forEach((project) => {
    const page = renderProjectPage(project);
    writeFile(page.relativePath, page.html);
  });
}

function main() {
  fs.rmSync(path.join(repoRoot, "projects"), { recursive: true, force: true });
  fs.rmSync(path.join(repoRoot, "en"), { recursive: true, force: true });
  buildLocale("zh");
  buildLocale("en");
}

main();
