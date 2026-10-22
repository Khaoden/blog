<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import { categories, categoryOf, matchesQuery } from '../utils/presentation'
import PostList from './PostList.vue'
import SiteIcon from './SiteIcon.vue'
const { theme } = useData()
const category = ref('全部')
const query = ref('')
const posts = computed(() => (theme.value.posts || []) as Post[])
const filtered = computed(() =>
  posts.value.filter(
    (post) =>
      (category.value === '全部' || categoryOf(post) === category.value) &&
      matchesQuery(post, query.value)
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
onMounted(() => {
  const value = new URLSearchParams(window.location.search).get('category')
  if (value && categories.includes(value)) category.value = value
})
function reset() {
  category.value = '全部'
  query.value = ''
}
</script>
<template>
  <div class="archive-page page-width">
    <header class="page-intro">
      <span class="eyebrow">WRITING</span>
      <h1>所有文章<span class="heading-dot">.</span></h1>
      <p>关于代码、学习与生活的 {{ posts.length }} 篇记录。</p>
    </header>
    <div class="home-columns">
      <section>
        <div class="archive-toolbar">
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
          <label class="archive-search"
            ><SiteIcon name="search" :size="18" /><input
              v-model="query"
              type="search"
              aria-label="筛选文章"
              placeholder="搜索这本笔记…"
          /></label>
        </div>
        <div class="results-summary" aria-live="polite">
          <span>{{ category === '全部' ? '所有记录' : category }}</span
          ><span>{{ filtered.length }} 篇</span>
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
          <SiteIcon name="search" :size="32" />
          <h2>这一页，暂时没有结果。</h2>
          <p>换一个关键词，或看看其他主题。</p>
          <button type="button" class="quiet-button" @click="reset">
            查看所有文章 <SiteIcon name="arrow" :size="17" />
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
