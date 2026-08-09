module.exports = {
  site: {
    site: {
      title: "Kaiyi Chen",
      metaTitle: "Kaiyi Chen | Scientometrics, Knowledge Management & Information Systems",
      metaDescription:
        "The personal website of Kaiyi Chen, featuring research in scientometrics, knowledge management, complex networks, and information systems.",
      footerLabel: "Built with",
      footerLinkLabel: "Retroframe",
      footerSuffix: "and customized around my research and projects."
    },
    topbar: {
      prefix: "Chengdu time"
    },
    banner: {
      title: "Kaiyi Chen",
      subtitle:
        "Scientometrics · Knowledge Management · Complex Networks · Information Systems"
    },
    navLinks: [
      { label: "Home", href: "index.html" },
      { label: "About", href: "about/index.html" },
      { label: "Publications", href: "publications/index.html" },
      { label: "Projects", href: "projects/index.html" },
      { label: "CV", href: "about/index.html#education" },
      { label: "GitHub", href: "https://github.com/ChenKai22567" },
      { label: "ORCID", href: "https://orcid.org/0009-0003-5217-7238" },
      { label: "Email", href: "mailto:kaiyi0365@163.com" }
    ],
    newsItems: [
      "2026: Launched LIS Frontier, an intelligent weekly literature tracker covering open metadata from 46 LIS journals.",
      "2025: Published a study of academic collaboration networks in Scientometrics.",
      "2025: Published a scientometric analysis of smart senior care research in Computers, Informatics, Nursing."
    ],
    profile: {
      imageAlt: "Portrait of Kaiyi Chen",
      name: "Kaiyi Chen",
      title: "M.Mgt. in Information Resource Management",
      affiliation: "Sichuan University",
      location: "Chengdu, China",
      focus:
        "Scientometrics, knowledge management, complex and social network analysis, and information-system design",
      availability:
        "Open to conversations about research analytics, knowledge organization, and information systems"
    },
    quickLinks: [
      { label: "Personal website", href: "https://624work.club/" },
      { label: "GitHub", href: "https://github.com/ChenKai22567" },
      { label: "View CV", href: "about/index.html#education" },
      { label: "Send email", href: "mailto:kaiyi0365@163.com" }
    ],
    contact: [
      {
        label: "Email",
        value: "kaiyi0365@163.com",
        href: "mailto:kaiyi0365@163.com"
      },
      { label: "Website", value: "624work.club", href: "https://624work.club/" },
      {
        label: "ORCID",
        value: "0009-0003-5217-7238",
        href: "https://orcid.org/0009-0003-5217-7238"
      },
      {
        label: "GitHub",
        value: "@ChenKai22567",
        href: "https://github.com/ChenKai22567"
      }
    ],
    introParagraphs: [
      "I earned a master's degree in Information Resource Management from Sichuan University under the supervision of Professor Leye Yao.",
      "I received the National Scholarship for Master's Students and was named an Outstanding Graduate Student of Sichuan University.",
      "My main research interests are scientometrics and knowledge management."
    ],
    aboutPage: {
      headline: "Research background, interests, and education.",
      sections: [
        {
          id: "biography",
          title: "Biography",
          paragraphs: [
            "I earned a master's degree in Information Resource Management from Sichuan University under the supervision of Professor Leye Yao.",
            "I received the National Scholarship for Master's Students and was named an Outstanding Graduate Student of Sichuan University.",
            "My main research interests are scientometrics and knowledge management."
          ]
        },
        {
          id: "research",
          title: "Research interests",
          paragraphs: [
            "Science and technology intelligence analysis and scientific big-data mining; complex and social network analysis; information-systems management and design; knowledge management."
          ]
        },
        {
          id: "education",
          title: "Education",
          paragraphs: [
            "Sep 2023–Jun 2026, Master of Management in Library and Information Science, Sichuan University.",
            "Sep 2019–Jun 2023, Bachelor of Management in Information Resource Management, Sichuan University."
          ]
        }
      ]
    },
    trustedBy: [
      {
        name: "Kaiyi Chen's personal website",
        href: "https://624work.club/",
        image: "assets/images/kaiyi-mark.png"
      },
      {
        name: "GitHub",
        href: "https://github.com/ChenKai22567",
        image: "assets/images/logos/github.svg"
      }
    ]
  },
  projects: {
    "lis-frontier": {
      title: "LIS Frontier Literature Tracker & Intelligent Weekly Brief",
      meta: "Research intelligence system / Full-stack project",
      summary:
        "An automatically updated LIS literature database and weekly brief with bilingual search, relevance grading, and traceable trend summaries.",
      thumbnailAlt: "LIS Frontier literature tracker interface",
      page: {
        headline:
          "A searchable and traceable frontier-observation tool built from distributed open scholarly metadata in Library and Information Science.",
        focus: "Research intelligence, literature tracking, trend detection, and weekly briefs",
        stack: "Next.js, FastAPI, SQLite, OpenAlex, DeepSeek",
        role: "Independent design, development, and deployment",
        quickLinks: [
          { label: "Visit website", href: "https://lis.624work.club/" },
          { label: "View source", href: "https://github.com/ChenKai22567/LIS_Frontier" }
        ],
        sections: [
          {
            id: "overview",
            title: "Overview",
            paragraphs: [
              "The project aggregates real open metadata from 46 Library and Information Science journals and supports bilingual search, topic filters, relevance grading, and network-analysis markers.",
              "It organizes newly indexed literature into traceable weekly evidence and uses that evidence to produce trend summaries, helping researchers identify directions worth monitoring."
            ]
          },
          {
            id: "features",
            title: "Core capabilities",
            paragraphs: [
              "The frontend handles literature browsing, filtering, and bilingual presentation, while the backend synchronizes, normalizes, stores, and retrieves open metadata.",
              "The intelligent weekly brief retains its sources and generation evidence, so every trend claim can be checked against the underlying literature."
            ],
            image: {
              src: "assets/images/lis-frontier.png",
              alt: "Screenshot of the LIS Frontier project",
              caption: "Literature tracking, topic filtering, and weekly trend summaries share one evidence-backed workflow."
            }
          }
        ]
      }
    },
    "talent-policy-guide": {
      title: "Talent Policy Service Guide",
      meta: "Policy information system / RAG assistant",
      summary:
        "A desktop-oriented talent-policy information and implementation guide combining policy retrieval, geographic information, and AI-assisted Q&A.",
      thumbnailAlt: "Talent Policy Service Guide interface",
      page: {
        headline:
          "A structured, searchable, and actionable service guide built from fragmented talent-policy materials.",
        focus: "Policy knowledge organization, RAG-assisted Q&A, and information visualization",
        stack: "Dify SSE, DeepSeek API, ECharts, GeoJSON, Node.js",
        role: "Independent product design and full-stack development",
        quickLinks: [
          { label: "Visit website", href: "https://demo.624work.club/" },
          { label: "View source", href: "https://github.com/ChenKai22567/624_policy_guide" }
        ],
        sections: [
          {
            id: "overview",
            title: "Overview",
            paragraphs: [
              "The project supports real talent-policy lookup and application scenarios. Rather than merely listing documents, it structures the relationships among eligible applicants, requirements, materials, and procedures.",
              "Designed primarily for desktop use, the interface brings policy content, geographic information, application guidance, and Q&A into one entry point."
            ]
          },
          {
            id: "system",
            title: "System design",
            paragraphs: [
              "The RAG assistant streams responses through Dify, while a Node.js proxy connects external services. ECharts and GeoJSON present geographic policy information.",
              "The architecture emphasizes portability, allowing the same information model and interaction pattern to be reused for other policy domains."
            ],
            image: {
              src: "assets/images/talent-policy-guide.png",
              alt: "Screenshot of the Talent Policy Service Guide",
              caption: "Policy information, geographic visualization, and intelligent Q&A are combined in one desktop workspace."
            }
          }
        ]
      }
    },
    "talent-dashboard": {
      title: "HR Management Information System Dashboard",
      meta: "Data visualization / Vanilla web",
      summary:
        "A visual and actionable interface translating HR system data structures and written requirements into an interactive dashboard.",
      thumbnailAlt: "HR management information system dashboard",
      page: {
        headline:
          "A management-oriented dashboard prototype derived directly from business requirements and data structures.",
        focus: "Requirements analysis, information architecture, and data visualization",
        stack: "HTML5, CSS3, Vanilla JavaScript",
        role: "Independent design and frontend development",
        quickLinks: [
          { label: "Visit website", href: "https://hr.624work.club/" },
          { label: "View source", href: "https://github.com/ChenKai22567/talent_dashboard" }
        ],
        sections: [
          {
            id: "overview",
            title: "Overview",
            paragraphs: [
              "The project begins with written requirements for an HR management information system, then organizes metrics, entity relationships, and common operations into pages that can be reviewed directly.",
              "The dashboard uses sections, charts, and status information to emphasize key data and make the intended management workflows easier to understand."
            ]
          },
          {
            id: "implementation",
            title: "Implementation",
            paragraphs: [
              "The project uses vanilla HTML, CSS, and JavaScript to deliver responsive layout, data presentation, and core interactions with minimal dependencies.",
              "This approach supports quick deployment and demonstrations while also serving as a requirements prototype for later system development."
            ],
            image: {
              src: "assets/images/talent-dashboard.webp",
              alt: "Screenshot of the HR data dashboard",
              caption: "Business metrics and operational entry points are organized into a quickly readable management view."
            }
          }
        ]
      }
    },
    devspace: {
      title: "DevSpace Remote Workspace",
      meta: "Productivity tool / Remote MCP",
      summary:
        "A remote workspace for safely operating server files and shell tasks from ChatGPT, with file transfer and task isolation.",
      thumbnailAlt: "DevSpace remote workspace guide",
      page: {
        headline:
          "An OAuth-protected remote MCP deployment that enables secure server-side editing, execution, and file transfer.",
        focus: "Remote development, authentication, file transfer, and task isolation",
        stack: "Next.js, OAuth 2.1 / PKCE, MCP, systemd, Nginx",
        role: "Deployment, integration, and documentation",
        quickLinks: [
          { label: "Read the guide", href: "https://devspace.624work.club/" },
          { label: "Upstream source", href: "https://github.com/Waishnav/devspace" }
        ],
        sections: [
          {
            id: "overview",
            title: "Overview",
            paragraphs: [
              "The project deploys the official DevSpace project as an OAuth-protected remote MCP with workspace editing, chat attachment uploads, isolated shell tasks, and expiring download links.",
              "The accompanying guide turns authentication, file movement, and server operations into a reusable deployment and usage workflow."
            ]
          },
          {
            id: "security",
            title: "Security and operations",
            paragraphs: [
              "Authentication uses OAuth 2.1 with PKCE. Download links include SHA-256 verification and expiration, while shell tasks and site services are isolated and routed through systemd and Nginx.",
              "The design keeps identity, file, and command-execution boundaries explicit without giving up the efficiency of remote development."
            ],
            image: {
              src: "assets/images/devspace-mcp-guide.png",
              alt: "Screenshot of the DevSpace remote workspace guide",
              caption: "The guide covers authorization, file transfer, task execution, and server-side isolation."
            }
          }
        ]
      }
    },
    "academic-collaboration-networks": {
      meta: "Publication / Scientometrics 2025",
      summary:
        "An analysis of 142,983 publications examining topology, connection tendencies, and community structure in LIS collaboration networks.",
      thumbnailAlt: "Kaiyi Chen's personal mark",
      publication: {
        abstract:
          "This study analyzes co-authorship networks derived from 142,983 Library and Information Science publications from 1900 to 2023. It examines network topology, connection tendencies, and community structure across multiple levels, revealing a shift toward team collaboration, small-world properties, geographic effects, and core–periphery patterns."
      },
      page: {
        headline:
          "A complex-systems perspective on the structure, connections, and communities of academic collaboration in Library and Information Science.",
        focus: "Academic collaboration networks, social network analysis, and complex systems",
        stack: "Scientometric analysis, network modeling, and community detection",
        role: "Co-author; contributed to the design and application of the network-analysis framework",
        collaborators: "Le-Ye Yao and Peng-Hui Lyu",
        quickLinks: [
          { label: "Read the paper", href: "https://link.springer.com/article/10.1007/s11192-025-05334-x" },
          { label: "DOI", href: "https://doi.org/10.1007/s11192-025-05334-x" }
        ],
        sections: [
          {
            id: "overview",
            title: "Research overview",
            paragraphs: [
              "The study builds academic collaboration networks at multiple levels from long-term LIS publication data and compares their topology, connection tendencies, and community structure.",
              "The results show a clear shift from individual work to team collaboration. The networks display small-world properties while also reflecting national borders, geographic proximity, and productivity differences."
            ]
          },
          {
            id: "contribution",
            title: "My contribution",
            paragraphs: [
              "I contributed to manuscript preparation and designed and applied a network-analysis framework grounded in complex systems theory.",
              "The work connects productivity distributions, collaboration preferences, and community structure within a unified multi-level network perspective."
            ]
          }
        ]
      }
    },
    "smart-senior-care": {
      meta: "Publication / Computers, Informatics, Nursing 2025",
      summary:
        "A scientometric study of global smart senior care research across academic collaboration, intellectual foundations, and emerging trends.",
      thumbnailAlt: "Kaiyi Chen's personal mark",
      publication: {
        abstract:
          "This study systematically analyzes smart senior care literature from 1981 to 2023 across publication output and collaboration, intellectual foundations and structure, and research fronts and trends. It identifies interdisciplinary characteristics, regional disparities, and two primary directions: technological innovation and humanistic care."
      },
      page: {
        headline:
          "A scientometric account of the collaboration landscape, intellectual structure, and evolving fronts of smart senior care research.",
        focus: "Smart senior care, scientometrics, research fronts, and network analysis",
        stack: "Bibliometrics, collaboration networks, intellectual-base analysis, and trend analysis",
        role: "Co-author; conducted research-front assessment and scientometric analysis",
        collaborators: "Le-Ye Yao, Qiao-Yun Yang, and Peng-Hui Lyu",
        quickLinks: [
          { label: "Read the abstract", href: "https://www.ovid.com/jnls/cinjournal/abstract/10.1097/cin.0000000000001437" },
          { label: "DOI", href: "https://doi.org/10.1097/CIN.0000000000001437" }
        ],
        sections: [
          {
            id: "overview",
            title: "Research overview",
            paragraphs: [
              "As population aging and demand for high-quality care grow, smart senior care supported by digital and information technologies has received increasing attention. The study examines output and collaboration, intellectual structure, and evolving research fronts.",
              "The analysis finds increasingly diverse and interconnected research alongside persistent regional disparities. Technological innovation and humanistic care form the field's two primary directions."
            ]
          },
          {
            id: "contribution",
            title: "My contribution",
            paragraphs: [
              "I conducted research-front assessment and scientometric analysis of global smart senior care scholarship and contributed to manuscript preparation.",
              "The findings were also presented at a parallel session of the Frontier Forum and National Graduate Academic Forum on Information Resource Management."
            ]
          }
        ]
      }
    },
    "complex-coauthorship": {
      meta: "Publication / Under submission",
      summary:
        "A study of self-similarity, self-organization, and evolutionary dynamics in LIS co-authorship networks.",
      thumbnailAlt: "Kaiyi Chen's personal mark",
      publication: {
        abstract:
          "This study examines the emergence of complex co-authorship structures in Library and Information Science, focusing on network self-similarity, self-organization, and evolutionary dynamics."
      },
      page: {
        headline:
          "Tracing how complex co-authorship structures emerge through long-term scholarly collaboration.",
        focus: "Co-authorship networks, complex network analysis, and evolutionary dynamics",
        stack: "Network modeling, structural measures, and evolutionary analysis",
        role: "Co-author",
        collaborators: "Leye Yao, Yiting Luo, and Mingze Zhang",
        quickLinks: [],
        sections: [
          {
            id: "overview",
            title: "Research overview",
            paragraphs: [
              "The study focuses on complex structures in LIS co-authorship networks and examines how self-similarity and self-organization emerge as collaboration accumulates.",
              "From an evolutionary network perspective, the paper investigates connections among structural levels and the long-term dynamics behind them."
            ]
          },
          {
            id: "status",
            title: "Current status",
            paragraphs: [
              "The manuscript is currently under submission. This page includes only its publicly shareable title, authors, and research direction."
            ]
          }
        ]
      }
    }
  }
};
