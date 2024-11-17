import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '这是我的个人博客',
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: 'About Me',
        link: '/aboutme.html',
      },
      {
        text: 'Friends',
        link: '/Friends.html',
      },
      {
        text: 'Welcome',
        link: '/welcome/',
      },
      {
        text: 'Blog',
        link: '/blog/',
      },
    ],
    home: '/blog/',
  }),
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    }]
  ]
}) 