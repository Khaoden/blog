import fs from 'fs'
import path from 'path'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { fileURLToPath } from 'url'
import type { Post } from '../types/blog'

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function excerptFrom(content: string): string {
  return content
    .replace(/^\s*```[\s\S]*?^\s*```/gm, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, '')
    .split('\n')
    .map((line) => line.replace(/^\s*(?:#{1,6}\s+|>\s*|[-*+]\s+|\d+\.\s+)/, '').trim())
    .filter((line) => line && !/^[\s|:=-]+$/.test(line))
    .join(' ')
    .replace(/[*_`]/g, '')
    .slice(0, 120)
}

export function getBlogPosts(): Post[] {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const postsDirectory = path.resolve(__dirname, '../../blog/posts')
  const posts: Post[] = []

  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  function getPostsRecursively(dir: string): void {
    const files = fs.readdirSync(dir)

    files.forEach((filename) => {
      const filePath = path.join(dir, filename)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        getPostsRecursively(filePath)
      } else if (filename.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const file = new VFile(content)
        matter(file, { strip: true })
        const frontmatter = file.data.matter as Post['frontmatter']
        const body = String(file.value ?? '')

        const relativePath = path.relative(postsDirectory, filePath)
        posts.push({
          excerpt: excerptFrom(body),
          hasContent: body.replace(/^\s*#\s+[^\n]*(?:\n|$)/, '').trim().length > 0,
          url: `/blog/posts/${relativePath.replace('.md', '')}`,
          frontmatter: {
            ...frontmatter,
            readingTime: calculateReadingTime(content),
            // An undated note must not look newly published on every build.
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : ''
          }
        })
      }
    })
  }

  getPostsRecursively(postsDirectory)
  return posts.sort(
    (a, b) => (Date.parse(b.frontmatter.date) || 0) - (Date.parse(a.frontmatter.date) || 0)
  )
}
