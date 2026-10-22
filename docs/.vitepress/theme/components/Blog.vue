<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import { categories, categoryOf, matchesQuery } from '../utils/presentation'
import PostList from './PostList.vue'
import ProfileCard from './ProfileCard.vue'
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
      <span class="eyebrow">THE ARCHIVE</span>
      <h1>文字是思考的痕迹<span class="heading-dot">.</span></h1>
      <p>关于技术，也关于生活。这里收着 {{ posts.length }} 篇记录，欢迎慢慢翻阅。</p>
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
        <PostList v-if="filtered.length" :posts="filtered" />
        <div v-else class="empty-state">
          <SiteIcon name="search" :size="32" />
          <h2>这一页，暂时没有结果。</h2>
          <p>换一个关键词，或看看其他主题。</p>
          <button type="button" class="quiet-button" @click="reset">
            查看所有文章 <SiteIcon name="arrow" :size="17" />
          </button>
        </div>
      </section>
      <ProfileCard :filter-in-place="true" @category="category = $event" />
    </div>
  </div>
</template>
