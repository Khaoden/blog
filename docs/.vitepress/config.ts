import { defineConfigWithTheme } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import type { Post } from './types/blog'
import { getBlogPosts } from './utils/posts'

export default defineConfigWithTheme<DefaultTheme.Config & { posts: Post[] }>({
  lang: 'zh-CN',
  title: 'Khaoden',
  description: 'Khaoden 的个人博客，记录后端开发、AI 应用与日常灵感。',
  cleanUrls: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f7f7f2' }]
  ],
  markdown: {
    headers: { level: [2, 3] }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/blog' },
      { text: '友链', link: '/friend' },
      { text: '关于', link: '/about' }
    ],
    posts: getBlogPosts()
  }
})
