# Kaiyi Chen · Retroframe Blog

陈恺义的中英双语学术个人网站，用于展示科学计量学、知识管理、复杂网络与信息系统方向的研究成果、代表论文和项目实践。

- 在线网站：[blog.624work.club](https://blog.624work.club/)
- 默认语言：English，可在导航栏切换中文
- 内容维护：通过 `content/` 中的结构化数据生成静态页面

## 技术特点

`Vanilla HTML/CSS/JavaScript` · `Node.js Static Generator` · `Responsive Design` · `Bilingual Content` · `Nginx`

- 无前端框架依赖的纯静态站点，部署简单、加载轻量。
- 中英文页面同步生成，支持语言偏好记忆与双语导航。
- 针对桌面端和移动端分别优化导航、排版、图片与内容间距。
- 包含规范的 SEO、Open Graph、站点图标与响应式元信息。

## 原项目与致谢

本项目基于 [Retroframe](https://github.com/bobtianqiwei/retroframe) 修改，原作者为 [Bob Tianqi Wei（@bobtianqiwei）](https://github.com/bobtianqiwei)。感谢原作者提供 Retro Web 2.0 风格的学术个人网站模板与 MIT 开源许可。

## 本地开发

```bash
npm install
npm run build
npm run preview
```

本地预览默认运行在 `http://127.0.0.1:8888/`。

主要内容文件：

- `content/site.js`：中文站点信息、个人资料与首页内容
- `content/en.js`：英文站点内容
- `content/projects/*.js`：项目与论文详情
- `scripts/build.js`：静态页面生成脚本
- `assets/`：样式、脚本与图片资源

## License

[MIT](./LICENSE)
