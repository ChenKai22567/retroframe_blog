module.exports = {
  slug: "talent-policy-guide",
  title: "人才政策服务指南",
  type: "project",
  meta: "政策信息系统 / RAG 助手",
  date: "2026",
  summary:
    "面向 PC 端的人才政策信息管理与实操指南，结合政策检索、地图信息与大模型问答。",
  thumbnail: "assets/images/talent-policy-guide.png",
  thumbnailAlt: "人才政策服务指南界面",
  featured: true,
  selected: true,
  featuredOrder: 2,
  selectedOrder: 2,
  page: {
    headline:
      "把分散的人才政策材料转化为结构化、可检索、可操作的服务指南。",
    focus: "政策知识组织、RAG 问答与信息可视化",
    stack: "Dify SSE, DeepSeek API, ECharts, GeoJSON, Node.js",
    role: "独立产品设计与全栈开发",
    quickLinks: [
      { label: "访问网站", href: "https://demo.624work.club/" },
      { label: "查看源码", href: "https://github.com/ChenKai22567/624_policy_guide" }
    ],
    sections: [
      {
        id: "overview",
        title: "项目概览",
        paragraphs: [
          "项目面向人才政策查询和实际办理场景，重点不是简单罗列文件，而是梳理政策对象、条件、材料与流程之间的关系。",
          "界面以桌面端使用为主，将政策内容、地区信息、办理提示与问答能力组织在同一入口。"
        ]
      },
      {
        id: "system",
        title: "系统设计",
        paragraphs: [
          "RAG 助手通过流式接口返回回答，Node.js 代理负责连接外部服务；ECharts 与 GeoJSON 用于呈现地区相关信息。",
          "整体结构强调迁移能力，便于将同一套信息组织和交互方式复用到新的政策专题。"
        ],
        image: {
          src: "assets/images/talent-policy-guide.png",
          alt: "人才政策服务指南页面截图",
          caption: "政策信息、地区可视化与智能问答被整合为一套桌面端工作界面。"
        }
      }
    ]
  }
};
