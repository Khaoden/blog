import type { Post } from '../../types/blog'

const algorithms = '/blog/posts/interview/代码随想录/'
export const originalNotes = [
  { title: 'Windows / Cursor', url: '/blog/posts/technology/os/Windows终端命令快捷进入cursor' },
  { title: '数组算法', url: algorithms + '数组算法' },
  { title: '字符串算法', url: algorithms + '字符串算法' },
  { title: '栈和队列', url: algorithms + '栈和队列' },
  { title: '回溯算法-组合', url: algorithms + '回溯算法-组合' }
]

const sections = [
  { id: 'tools', title: 'Windows 与工具', icon: 'terminal' },
  { id: 'algorithms', title: '算法练习', icon: 'code' },
  { id: 'java', title: 'Java 基础', icon: 'coffee' },
  { id: 'spring', title: 'Spring', icon: 'layers' },
  { id: 'javascript', title: 'JavaScript', icon: 'code' },
  { id: 'other', title: '随笔', icon: 'book' }
]

function sectionOf(post: Post): string {
  if (post.url.includes('/technology/')) return 'tools'
  if (post.url.includes('/interview/')) return 'algorithms'
  if (post.url.includes('/javaSE/')) return 'java'
  if (post.url.includes('/Spring/')) return 'spring'
  if (post.url.includes('/javascript-')) return 'javascript'
  return 'other'
}

function pinnedOrder(post: Post): number {
  const index = originalNotes.findIndex((note) => note.url === post.url)
  return index < 0 ? originalNotes.length : index
}

export function notebookGroups(posts: Post[]) {
  return sections
    .map((section) => ({
      ...section,
      posts: posts
        .filter((post) => sectionOf(post) === section.id)
        .sort((a, b) => pinnedOrder(a) - pinnedOrder(b))
    }))
    .filter((section) => section.posts.length)
}

export function recentNotes(posts: Post[], category: string, categoryOf: (post: Post) => string) {
  return posts
    .filter((post) => category === '全部' || categoryOf(post) === category)
    .sort(
      (a, b) =>
        (Date.parse(b.frontmatter.lastUpdated || '') || 0) -
        (Date.parse(a.frontmatter.lastUpdated || '') || 0)
    )
}
