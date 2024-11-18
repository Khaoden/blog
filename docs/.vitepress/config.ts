import { defineConfig } from 'vitepress'

// 默认主题配置，提供智能化提示
export default defineConfig({
  // 站点级选项
  lang: 'zh-CN',
  title: '我的博客',  // 级别没有frontmatter高
  description: '这是我的个人博客',
  
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    }], 
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
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
        gtag('config', 'G-9999KR6YC8');`
      ]
  ],

  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [
      { text: '主页', link: '/' },
      { text: '关于我', link: '/about' },
      { text: '友链', link: '/friend' },
      { text: '欢迎', link: '/welcome' },
      { text: '博客', link: '/blog' }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Khaoden' }
    ],

    // 页脚配置
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()}-present Khaoden`
    },

    // 侧边栏配置
    sidebar: {
      '/blog/': [
        {
          text: '博客文章',
          items: [
            { text: '最新文章', link: '/blog/' }
          ]
        }
      ]
    },

    // 搜索配置
    search: {
      provider: 'local'
    }
  }
}) 