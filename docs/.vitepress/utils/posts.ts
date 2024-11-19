import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post } from '../types/blog'

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getBlogPosts(): Post[] {
  const postsDirectory = path.resolve(__dirname, '../../blog/posts')
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