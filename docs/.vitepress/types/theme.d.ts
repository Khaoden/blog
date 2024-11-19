import type { DefaultTheme, ThemeConfig } from 'vitepress'
import type { Post } from './blog'

declare module 'vitepress' {
  interface ThemeConfig extends DefaultTheme.Config {
    posts: Post[]
  }

  interface Config {
    themeConfig: ThemeConfig
  }
} 