<template>
  <div class="theme">
    <component :is="layout" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Landing from './Landing.vue'
import Home from '../components/Home.vue'
import Article from './Article.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()

const layout = computed(() => {
  if (frontmatter.value.layout === 'Landing') return Landing
  if (frontmatter.value.layout === 'home') return Home
  if (frontmatter.value.layout === 'article') return Article
  return Layout
})
</script>

<style scoped>
.theme {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 