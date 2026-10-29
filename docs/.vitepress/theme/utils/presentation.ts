import type { Post } from '../../types/blog'
export const categories = ['开发笔记', '算法与面试', '工具与效率', '随笔']
export function categoryOf(post: Post): string {
  if (post.url.includes('/interview/')) return '算法与面试'
  if (post.url.includes('/learning/')) return '开发笔记'
  if (post.url.includes('/technology/')) return '工具与效率'
  return '随笔'
}
export function titleOf(post: Post): string {
  return post.frontmatter.title || decodeURIComponent(post.url.split('/').pop() || '未命名笔记')
}
export function dateLabel(date?: string): string {
  if (!date || !Number.isFinite(Date.parse(date))) return '未标日期'
  return new Date(date).toISOString().slice(0, 10).replaceAll('-', '.')
}
export function matchesQuery(post: Post, query: string): boolean {
  const text = [
    titleOf(post),
    post.frontmatter.description || '',
    post.excerpt || '',
    ...(post.frontmatter.tags || [])
  ]
    .join(' ')
    .toLocaleLowerCase()
  return query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => text.includes(term))
}
export function summaryOf(post: Post): string {
  if (post.hasContent === false) return '这份笔记暂时还没有正文。'
  const description = post.frontmatter.description
  return description && description !== titleOf(post) && description.length > 18
    ? description
    : post.excerpt || '这份笔记还在整理中。'
}
