module.exports = {
  slug: "talent-dashboard",
  title: "人力资源管理信息系统数据看板",
  type: "project",
  meta: "数据可视化 / 原生 Web",
  date: "2026",
  summary:
    "将人力资源管理系统的数据结构与文字需求转化为直观、可操作的可视化页面。",
  thumbnail: "assets/images/talent-dashboard.webp",
  thumbnailAlt: "人力资源管理信息系统数据看板",
  featured: false,
  selected: true,
  featuredOrder: 3,
  selectedOrder: 3,
  page: {
    headline:
      "从业务需求与数据结构出发，完成一套面向管理场景的数据看板原型。",
    focus: "需求梳理、信息架构与数据可视化",
    stack: "HTML5, CSS3, 原生 JavaScript",
    role: "独立设计与前端开发",
    quickLinks: [
      { label: "访问网站", href: "https://hr.624work.club/" },
      { label: "查看源码", href: "https://github.com/ChenKai22567/talent_dashboard" }
    ],
    sections: [
      {
        id: "overview",
        title: "项目概览",
        paragraphs: [
          "项目从人力资源管理信息系统的业务描述出发，梳理指标、实体关系和常用操作，再将文字需求转化为可直接评审的页面。",
          "看板通过分区、图表与状态信息突出关键数据，帮助使用者快速理解系统应当支持的管理动作。"
        ]
      },
      {
        id: "implementation",
        title: "实现方式",
        paragraphs: [
          "项目使用原生 HTML、CSS 与 JavaScript 实现，以较低依赖完成响应式布局、数据展示和基础交互。",
          "这种实现便于快速部署和演示，也能作为后续系统开发时的需求沟通原型。"
        ],
        image: {
          src: "assets/images/talent-dashboard.webp",
          alt: "人力资源数据看板页面截图",
          caption: "业务指标和操作入口被组织为可快速理解的管理视图。"
        }
      }
    ]
  }
};
