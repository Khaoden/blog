<template>
  <div class="article-nav" v-if="currentCategory && articles.length > 0">
    <div class="nav-header">
      <span>{{ currentCategory }} 系列文章</span>
    </div>
    <select v-model="currentArticle" @change="navigateToArticle" class="article-select">
      <option v-for="article in articles" 
              :key="article.url" 
              :value="article.url">
        {{ article.title }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData, useRoute } from 'vitepress'

const { theme } = useData()
const route = useRoute()

const currentCategory = computed(() => {
  const path = route.path
  const match = path.match(/\/blog\/posts\/([^/]+)\/([^/]+)/)
  return match ? `${match[1]}/${match[2]}` : null
})

const articles = computed(() => {
  if (!currentCategory.value) return []
  return theme.value.posts.filter(post => 
    post.frontmatter.category === currentCategory.value
  )
})

const currentArticle = ref(route.path)

const navigateToArticle = () => {
  window.location.href = currentArticle.value
}
</script>

<style scoped>
.article-nav {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.nav-header {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.article-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}
</style> 