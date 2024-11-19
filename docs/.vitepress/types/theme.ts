import type { Post } from './blog'

export interface Theme {
    nav: Array<{
      text: string
      link: string
    }>
    socialLinks: Array<{
      icon: string
      link: string
    }>
    sidebar: Record<string, any>  // 可以根据需要定义更详细的类型
    search: {
      provider: string
    }
    posts: Post[]
    footer: {
      message: string
      copyright: string
    }
  }