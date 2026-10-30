export interface Post {
  url: string
  excerpt?: string
  searchText?: string
  hasContent?: boolean
  frontmatter: {
    title?: string
    description?: string
    shortTitle?: string
    aliases?: string[]
    lastUpdated?: string
    date: string
    tags?: string[]
    readingTime?: number
    [key: string]: any
  }
}
