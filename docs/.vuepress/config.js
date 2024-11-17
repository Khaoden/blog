import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '这是我的个人博客',
  theme: defaultTheme({
    navbar: [
      { text: '首页', link: '/' },
      { text: '友链', link: '/Friends.html' },
    ],
    sidebar: 'auto'
  }),
})