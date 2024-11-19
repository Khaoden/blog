export interface Post {
  url: string
  frontmatter: {
    title?: string
    description?: string
    date: string
    tags?: string[]
    readingTime?: number
    [key: string]: any
  }
}