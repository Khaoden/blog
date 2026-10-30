import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import { getBlogPosts } from '../docs/.vitepress/utils/posts.ts'
import {
  notebookGroups,
  originalNotes,
  recentNotes
} from '../docs/.vitepress/theme/utils/notebook.ts'
import { categoryOf, matchesQuery } from '../docs/.vitepress/theme/utils/presentation.ts'

const posts = getBlogPosts()

test('every Markdown note has exactly one index entry and one notebook entry', () => {
  const directory = fileURLToPath(new URL('../docs/blog/posts/', import.meta.url))
  const files = readdirSync(directory, { recursive: true }).filter((file) => file.endsWith('.md'))
  const expected = files
    .map((file) => '/blog/posts/' + file.replace(/\\/g, '/').slice(0, -3))
    .sort()
  assert.deepEqual(posts.map((post) => post.url).sort(), expected)
  assert.deepEqual(
    notebookGroups(posts)
      .flatMap((group) => group.posts.map((post) => post.url))
      .sort(),
    expected
  )
})

test('the original Windows and algorithm notes are still present and take priority in their groups', () => {
  for (const note of originalNotes) {
    const post = posts.find((post) => post.url === note.url)
    assert.ok(post, note.url)
    assert.equal(post.hasContent, true)
  }
  const tools = notebookGroups(posts).find((group) => group.id === 'tools')
  assert.equal(tools.posts[0].url, originalNotes[0].url)
})

test('search finds the old Windows filename, wide characters and text near the end of a note', () => {
  const windows = posts.find((post) => post.url === originalNotes[0].url)
  assert.equal(matchesQuery(windows, 'Windows终端命令快捷进入cursor'), true)
  assert.equal(matchesQuery(windows, 'Ｗｉｎｄｏｗｓ cursor'), true)
  assert.equal(matchesQuery(windows, '进程生命周期'), true)
  assert.ok(!windows.excerpt.includes('进程生命周期'))
  const backtracking = posts.find((post) => post.url === originalNotes[4].url)
  assert.equal(matchesQuery(backtracking, '解数独'), true)
  assert.equal(matchesQuery(windows, 'not-a-real-keyword-12345'), false)
})

test('old Java titles and the restored closure path remain searchable', () => {
  const oop = posts.find((post) => post.url.endsWith('/javaSE/面向对象'))
  assert.equal(matchesQuery(oop, 'JavaOOP'), true)
  const closure = posts.find((post) => post.url.endsWith('/learning/javascript-closure'))
  assert.ok(closure)
  assert.equal(matchesQuery(closure, 'JavaScript闭包详解'), true)
})

test('future dates, missing dates and incomplete notes are not silently excluded', () => {
  const examples = [
    { url: '/blog/posts/future', frontmatter: { date: '2077-03-20' }, hasContent: true },
    { url: '/blog/posts/undated', frontmatter: { date: '' }, hasContent: true },
    { url: '/blog/posts/incomplete', frontmatter: { date: '' }, hasContent: false }
  ]
  const expected = examples.map((post) => post.url).sort()
  assert.deepEqual(
    recentNotes(examples, '全部', categoryOf)
      .map((post) => post.url)
      .sort(),
    expected
  )
  assert.deepEqual(
    notebookGroups(examples)
      .flatMap((group) => group.posts.map((post) => post.url))
      .sort(),
    expected
  )
})

test('every legacy note redirect points to an existing Markdown page', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.ok(config.redirects.length >= 6)
  assert.equal(new Set(config.redirects.map((rule) => rule.source)).size, config.redirects.length)
  for (const rule of config.redirects) {
    assert.equal(rule.permanent, true)
    const target = new URL(
      '../docs' + decodeURIComponent(rule.destination) + '.md',
      import.meta.url
    )
    assert.ok(readFileSync(target, 'utf8').length > 0, rule.destination)
  }
})
