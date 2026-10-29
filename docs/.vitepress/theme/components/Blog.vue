<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import { categories, categoryOf, matchesQuery } from '../utils/presentation'
import PostList from './PostList.vue'
import SiteIcon from './SiteIcon.vue'

type NoteView = 'ready' | 'all' | 'drafts'
const { theme } = useData()
const category = ref('全部')
const query = ref('')
const view = ref<NoteView>('ready')
const filterInput = ref<HTMLInputElement>()
const posts = computed(() => (theme.value.posts || []) as Post[])
const readyCount = computed(() => posts.value.filter((post) => post.hasContent !== false).length)
const matching = computed(() =>
  posts.value.filter(
    (post) =>
      (category.value === '全部' || categoryOf(post) === category.value) &&
      matchesQuery(post, query.value)
  )
)
const pendingMatches = computed(
  () => matching.value.filter((post) => post.hasContent === false).length
)
const views = computed(() => [
  { value: 'ready' as const, label: '有正文', count: matching.value.length - pendingMatches.value },
  { value: 'all' as const, label: '全部记录', count: matching.value.length },
  { value: 'drafts' as const, label: '整理中', count: pendingMatches.value }
])
const filtered = computed(() =>
  matching.value.filter(
    (post) =>
      view.value === 'all' ||
      (view.value === 'ready' ? post.hasContent !== false : post.hasContent === false)
  )
)
const groups = computed(() => {
  const result = new Map<string, Post[]>()
  for (const post of filtered.value) {
    const year = Number.isFinite(Date.parse(post.frontmatter.date))
      ? String(new Date(post.frontmatter.date).getUTCFullYear())
      : '未标日期'
    if (!result.has(year)) result.set(year, [])
    result.get(year)!.push(post)
  }
  return Array.from(result, ([year, posts]) => ({ year, posts }))
})
let mounted = false
function readLocation() {
  const params = new URLSearchParams(window.location.search)
  const selectedCategory = params.get('category')
  const selectedView = params.get('view')
  category.value =
    selectedCategory && categories.includes(selectedCategory) ? selectedCategory : '全部'
  view.value = selectedView === 'all' || selectedView === 'drafts' ? selectedView : 'ready'
  query.value = (params.get('q') || '').slice(0, 180)
}
function syncLocation() {
  if (!mounted) return
  const url = new URL(window.location.href)
  if (!/^\/blog(?:\/index)?(?:\.html)?\/?$/.test(url.pathname)) return
  if (category.value === '全部') url.searchParams.delete('category')
  else url.searchParams.set('category', category.value)
  if (view.value === 'ready') url.searchParams.delete('view')
  else url.searchParams.set('view', view.value)
  if (query.value.trim()) url.searchParams.set('q', query.value)
  else url.searchParams.delete('q')
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
}
watch([category, query, view], syncLocation)
onMounted(() => {
  readLocation()
  mounted = true
  window.addEventListener('popstate', readLocation)
})
onUnmounted(() => {
  mounted = false
  window.removeEventListener('popstate', readLocation)
})
function reset() {
  category.value = '全部'
  query.value = ''
  view.value = 'ready'
}
function clearQuery() {
  query.value = ''
  filterInput.value?.focus()
}
</script>

<template>
  <div class="archive-page page-width">
    <header class="page-intro">
      <span class="eyebrow">WRITING</span>
      <h1>所有文章<span class="heading-dot">.</span></h1>
      <p>{{ readyCount }} 篇有正文的笔记，{{ posts.length - readyCount }} 份正在整理的记录。</p>
    </header>
    <section>
      <div class="archive-toolbar">
        <div class="archive-controls">
          <div class="note-view-tabs" role="group" aria-label="笔记状态">
            <button
              v-for="item in views"
              :key="item.value"
              type="button"
              :class="{ selected: view === item.value }"
              :aria-pressed="view === item.value"
              @click="view = item.value"
            >
              {{ item.label }}<span>{{ item.count }}</span>
            </button>
          </div>
          <div class="archive-search">
            <SiteIcon name="search" :size="18" /><input
              ref="filterInput"
              v-model="query"
              type="search"
              aria-label="筛选文章"
              placeholder="搜索标题、标签或关键词…"
              maxlength="180"
            /><button v-if="query" type="button" aria-label="清空筛选" @click.prevent="clearQuery">
              <SiteIcon name="close" :size="16" />
            </button>
          </div>
        </div>
        <div class="category-tabs" aria-label="文章分类">
          <button
            v-for="item in ['全部', ...categories]"
            :key="item"
            type="button"
            :class="{ selected: category === item }"
            :aria-pressed="category === item"
            @click="category = item"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <div class="results-summary" aria-live="polite">
        <span
          >{{ category === '全部' ? '所有主题' : category }} ·
          {{ views.find((item) => item.value === view)?.label }}</span
        ><span>{{ filtered.length }} {{ view === 'ready' ? '篇正文' : '份记录' }}</span>
      </div>
      <div v-if="filtered.length" class="archive-groups">
        <section v-for="group in groups" :key="group.year" class="archive-group">
          <h2 class="archive-year">
            {{ group.year }}<span>{{ group.posts.length }} 篇</span>
          </h2>
          <PostList :posts="group.posts" />
        </section>
      </div>
      <div v-else class="empty-state">
        <SiteIcon :name="pendingMatches && view === 'ready' ? 'book' : 'search'" :size="32" />
        <h2>
          {{
            pendingMatches && view === 'ready' ? '这些笔记还在整理中。' : '没有找到符合条件的笔记。'
          }}
        </h2>
        <p>
          {{
            pendingMatches && view === 'ready'
              ? pendingMatches + ' 份相关记录尚未写完，可以切换查看。'
              : '换一个关键词，或者看看其他主题。'
          }}
        </p>
        <div class="empty-state-actions">
          <button
            v-if="pendingMatches && view === 'ready'"
            type="button"
            class="primary-button"
            @click="view = 'drafts'"
          >
            查看整理中的笔记 <SiteIcon name="arrow" :size="16" /></button
          ><button type="button" class="quiet-button" @click="reset">
            阅读全部正文 <SiteIcon name="arrow" :size="16" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
