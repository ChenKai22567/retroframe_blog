module.exports = {
  slug: "lis-frontier",
  title: "LIS 前沿文献追踪与智能周报",
  type: "project",
  meta: "学术情报系统 / 全栈项目",
  date: "2026",
  summary:
    "自动更新的图书情报学前沿文献库与智能周报，支持双语检索、相关性分级与可追溯的趋势总结。",
  thumbnail: "assets/images/lis-frontier.png",
  thumbnailAlt: "LIS 前沿文献追踪与智能周报界面",
  featured: true,
  selected: true,
  featuredOrder: 1,
  selectedOrder: 1,
  page: {
    headline:
      "把分散的开放学术元数据整理为可检索、可筛选、可追溯的图书情报学前沿观察工具。",
    focus: "科技情报、文献追踪、趋势识别与智能周报",
    stack: "Next.js, FastAPI, SQLite, OpenAlex, DeepSeek",
    role: "独立设计、开发与部署",
    quickLinks: [
      { label: "访问网站", href: "https://lis.624work.club/" },
      { label: "查看源码", href: "https://github.com/ChenKai22567/LIS_Frontier" }
    ],
    sections: [
      {
        id: "overview",
        title: "项目概览",
        paragraphs: [
          "该项目聚合 46 种图书情报学期刊的真实开放元数据，提供中英文检索、主题筛选、相关性分级与网络分析标记。",
          "系统将每周新增文献组织为可追溯的数据证据，并在此基础上生成趋势总结，帮助研究者更快发现值得持续关注的方向。"
        ]
      },
      {
        id: "features",
        title: "核心能力",
        paragraphs: [
          "前端负责文献浏览、筛选和双语信息呈现，后端完成开放元数据同步、标准化、持久化与检索服务。",
          "智能周报保留来源与生成依据，让趋势判断能够回到具体文献核验，而不是只输出不可追溯的摘要。"
        ],
        image: {
          src: "assets/images/lis-frontier.png",
          alt: "LIS 前沿项目页面截图",
          caption: "文献追踪、主题筛选与每周趋势总结集中在同一套工作流中。"
        }
      }
    ]
  }
};
