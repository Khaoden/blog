## Khaoden的blog

1. 欢迎大家在/docs/.vitepress/config/friends.ts中添加自己的信息成为我的好友

## 开发与安全检查

推荐使用 Node.js 22 或 24，以及 `package.json` 固定的 pnpm 9.15.9。

```sh
pnpm install --frozen-lockfile
pnpm docs:dev
pnpm docs:build
pnpm audit
```

请使用 pnpm 安装依赖：`pnpm.overrides` 将 VitePress 1.6 的 Vite 依赖升级到已修复漏洞的 6.4.4 及后续兼容版本。VitePress 1.6 默认仍依赖旧版 Vite 5，因此不要在升级时直接删除该覆盖配置；应先复查安全公告，并验证构建、页面搜索和跳转。

文章信息使用 `vfile-matter` 解析；未使用的 Motion 插件已移除，避免继续引入旧版 Nuxt 和归档解压工具链。更新依赖时应同时提交 `pnpm-lock.yaml`，并重新执行构建和安全检查。

## 页面与主题维护

首页、文章归档、友链、关于和项目页面共用自定义主题，入口是 `docs/.vitepress/theme/Layout/Layout.vue`。文章正文直接通过 VitePress 的 `Content` 渲染，右侧目录来自 Markdown 标题；不再套用会把 `article` 当作原生标签的旧布局。

- 文章保存在 `docs/blog/posts/`，标题、日期和标签继续读取 Markdown 元信息；未填写日期的笔记显示「未标日期」，不会在每次构建时被当作新文章。
- 友链信息在 `docs/.vitepress/config/friends.ts`；未提供头像时显示名称首字母。
- 全局样式和深浅主题配色在 `docs/.vitepress/style/custom.css`，不依赖外部字体、图标 CDN 或粒子动画。
- 搜索支持标题、标签、描述和文章摘要；可使用 `Ctrl/Command + K` 打开、`Esc` 关闭、`Enter` 打开首个结果。
- 修改主题后，检查桌面与手机布局、分类筛选、搜索、主题切换、文章正文及目录、友链信息复制，再执行 `pnpm docs:build` 和 `pnpm audit`。
