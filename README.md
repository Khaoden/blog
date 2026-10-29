## Khaoden的blog

1. 欢迎大家在/docs/.vitepress/config/friends.ts中添加自己的信息成为我的好友

## 开发与安全检查

使用 `package.json` 指定的 Node.js 24 和 pnpm 9.15.9，与 Vercel 生产构建保持一致。

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
- 正文、归档和通用样式在 `docs/.vitepress/style/custom.css`；导航与页面容器在 `style/layout.css`，首页名片、轨道和卡片在 `style/home.css`。字体、图标均从本地加载。
- 搜索支持标题、标签、描述和文章摘要；可使用 `Ctrl/Command + K` 打开、`Esc` 关闭、`Enter` 打开首个结果。
- 修改主题后，检查桌面与手机布局、分类筛选、搜索、主题切换、文章正文及目录、友链信息复制，再执行 `pnpm docs:build` 和 `pnpm audit`。

## 设计参考

当前主题采用顶部导航、倾斜个人名片、环形图标和内容卡片；浅灰背景配暖橙色点缀，提供深色主题。首页的栏目数量、笔记和项目来自现有内容，没有添加虚构的社交账号、关注量或个人经历。

本次以 [qzq.at](https://www.qzq.at/) 为设计方向。当前云环境直接访问该站会被网络代理返回 403，因此使用了明确注明参考它的公开实现及对照记录来确认布局和交互，未声称逐像素复刻原站当前版本：

- [Orbit 公开实现](https://github.com/wxh518/wxh518.github.io)：个人名片、轨道与模块式主页的设计参考。
- [页面对照记录](https://github.com/wxh518/wxh518.github.io/blob/master/docs/visual-comparison.md)：名片、Coda 字体、深色频道卡片和模块布局的参考说明。

页面使用本项目自己的 Vue 与 CSS 实现，不引入参考项目的框架、个人照片、作品或统计数据。英文展示标题使用本地 Coda，正文使用 Inter 和系统中文字体；字体许可证均在 `docs/public/fonts/`。

顶部的动画开关会记住个人偏好；系统启用「减少动态效果」时，轨道和倾斜跟随会停止。桌面轨道在鼠标悬停或键盘焦点进入首屏时暂停，便于点击；手机采用静态名片与头像，保留所有内容入口。

## Vercel 部署

仓库根目录的 `vercel.json` 指定 VitePress、安装与构建命令，以及 `docs/.vitepress/dist` 输出目录。Vercel 项目的 Node.js Version 应设为 `24.x`；旧项目的 `20.x` 已被 Vercel 停用，会在安装依赖前直接构建失败。

生产分支为 `main`。关联 GitHub 仓库后，推送会触发部署；旧自定义域名失效时，可以继续使用项目的 `vercel.app` 地址。`.vercel` 和 `.env*` 保留在本机，不提交账号或环境凭据。
