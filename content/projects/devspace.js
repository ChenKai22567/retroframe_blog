module.exports = {
  slug: "devspace",
  title: "DevSpace 远程工作区",
  type: "project",
  meta: "效率工具 / 远程 MCP",
  date: "2026",
  summary:
    "在 ChatGPT 中安全操作服务器文件与 Shell 的远程工作区，并提供文件传输与隔离任务能力。",
  thumbnail: "assets/images/devspace-mcp-guide.png",
  thumbnailAlt: "DevSpace 远程工作区使用指南",
  featured: false,
  selected: true,
  featuredOrder: 4,
  selectedOrder: 4,
  page: {
    headline:
      "将 DevSpace 部署为受 OAuth 保护的远程 MCP，使服务器工作区可以被安全地编辑、运行和传输文件。",
    focus: "远程开发、身份认证、文件传输与任务隔离",
    stack: "Next.js, OAuth 2.1 / PKCE, MCP, systemd, Nginx",
    role: "部署、集成与使用指南编写",
    quickLinks: [
      { label: "查看使用指南", href: "https://devspace.624work.club/" },
      { label: "上游源码", href: "https://github.com/Waishnav/devspace" }
    ],
    sections: [
      {
        id: "overview",
        title: "项目概览",
        paragraphs: [
          "该项目将官方 DevSpace 部署为 OAuth 保护的远程 MCP，支持工作区文件编辑、聊天附件上传、隔离 Shell 任务与短期下载链接。",
          "使用指南将认证、文件流转和服务器操作流程整理为可复用的部署与使用路径。"
        ]
      },
      {
        id: "security",
        title: "安全与运维",
        paragraphs: [
          "认证采用 OAuth 2.1 与 PKCE，下载链接带有 SHA-256 校验并设置有效期；Shell 任务和站点服务通过 systemd 与 Nginx 进行隔离和转发。",
          "设计目标是在保留远程开发效率的同时，让身份、文件和命令执行的边界更清楚。"
        ],
        image: {
          src: "assets/images/devspace-mcp-guide.png",
          alt: "DevSpace 远程工作区指南截图",
          caption: "指南覆盖授权、文件传输、任务运行和服务器侧隔离。"
        }
      }
    ]
  }
};
