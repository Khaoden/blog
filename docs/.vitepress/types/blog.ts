export interface Post {
  url: string
  excerpt?: string
  hasContent?: boolean
  frontmatter: {
    title?: string
    description?: string
    date: string
    tags?: string[]
    readingTime?: number
    [key: string]: any
  }
}
