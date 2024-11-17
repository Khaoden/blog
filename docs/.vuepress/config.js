import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default {
  lang: 'zh-CN',
  title: '我的博客',
  description: '这是我的个人博客',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '友链', link: '/Friends.html' },
    ],
    sidebar: false
  }),
} 