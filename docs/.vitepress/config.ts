import { defineConfig } from 'vitepress'
import type { DefaultTheme } from 'vitepress'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from './types/blog'

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function getBlogPosts(): Post[] {
  const postsDirectory = path.resolve(__dirname, '../blog/posts')
  const posts: Post[] = []
  
  function getPostsRecursively(dir: string): void {
    const files = fs.readdirSync(dir)
    
    files.forEach(filename => {
      const filePath = path.join(dir, filename)
      const stat = fs.statSync(filePath)
      
      if (stat.isDirectory()) {
        getPostsRecursively(filePath)
      } else if (filename.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data: frontmatter } = matter(content)
        
        const relativePath = path.relative(postsDirectory, filePath)
        posts.push({
          url: `/blog/posts/${relativePath.replace('.md', '')}`,
          frontmatter: {
            ...frontmatter,
            readingTime: calculateReadingTime(content),
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString()
          }
        })
      }
    })
  }
  
  getPostsRecursively(postsDirectory)
  return posts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export default defineConfig({
  lang: 'zh-CN',
  title: '我的博客',
  description: '这是我的个人博客',
  
  head: [
    ['link', { 
      rel: 'stylesheet', 
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
    }]
  ],

  themeConfig: {
    nav: [
      { text: 'home', link: '/home' },
      { text: 'blog', link: '/blog' },
      { text: 'friends', link: '/friend' },
      { text: 'project', link: '/project' },
      { text: 'about', link: '/about' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Khaoden' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()}-present Khaoden`
    },

    sidebar: {
      '/blog/posts/learning/': [
        {
          text: '学习笔记',
          collapsed: false,
          items: [
            {
              text: 'JavaSE',
              collapsed: true,
              items: [
                { text: '基础语法', link: '/blog/posts/learning/javaSE/basics' },
                { text: '面向对象', link: '/blog/posts/learning/javaSE/oop' },
                { text: '集合框架', link: '/blog/posts/learning/javaSE/collection' }
              ]
            },
            {
              text: 'Spring',
              collapsed: true,
              items: [
                { text: 'IOC容器', link: '/blog/posts/learning/Spring/ioc' },
                { text: 'AOP编程', link: '/blog/posts/learning/Spring/aop' }
              ]
            },
            { text: 'SpringMVC', link: '/blog/posts/learning/SpringMVC/' },
            { text: 'MyBatis', link: '/blog/posts/learning/MyBatis/' },
            { text: 'SpringBoot', link: '/blog/posts/learning/SpringBoot/' },
            { text: 'Vue', link: '/blog/posts/learning/Vue/' },
            { text: 'Vue Router', link: '/blog/posts/learning/VueRouter/' },
            { text: 'Maven', link: '/blog/posts/learning/maven/' }
          ]
        }
      ],
      '/blog/posts/technology/': [
        {
          text: '技术探索',
          collapsed: false,
          items: [
            { text: '代码随想录', link: '/blog/posts/technology/code-record/' },
            { text: '数据结构', link: '/blog/posts/technology/data-structure/' },
            { text: '计算机网络', link: '/blog/posts/technology/computer-network/' },
            { text: '操作系统', link: '/blog/posts/technology/operating-system/' },
            { text: '计算机组成原理', link: '/blog/posts/technology/computer-composition/' },
            { text: '设计模式', link: '/blog/posts/technology/design-pattern/' }
          ]
        }
      ],
      '/blog/posts/interview/': [
        {
          text: '面试相关',
          collapsed: false,
          items: [
            { text: '面经分享', link: '/blog/posts/interview/experience/' },
            { text: '算法题解', link: '/blog/posts/interview/algorithm/' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    // @ts-ignore
    posts: getBlogPosts()
  } as DefaultTheme.Config & { posts: Post[] }
}) 