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
