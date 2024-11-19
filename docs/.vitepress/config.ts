import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import { generateSidebar } from './utils/sidebar'
import { getBlogPosts } from './utils/posts'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Khaoden',
  description: '这是我的个人博客',
  
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    }],
    ['link', {
      rel: 'icon',
      href: '/images/avatar.jpg'
    }],
    [
      'script',
      { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-9999KR6YC8' }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'TAG_ID');`
    ]
  ],

  themeConfig: {
    nav: [
      { text: '🏠 home', link: '/home' },
      { text: '📝 blog', link: '/blog' },
      { text: '👬 friends', link: '/friend' },
      { text: '🛠️ project', link: '/projects' },
      { text: '👤 about', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Khaoden' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()}-present Khaoden`
    },

    sidebar: generateSidebar(),

    search: {
      provider: 'local'
    },

    // @ts-ignore
    posts: getBlogPosts()
  } as DefaultTheme.Config
}) 