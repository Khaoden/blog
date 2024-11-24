<template>
  <div class="article-container">
    <div class="article-cover" :style="coverStyle">
      <div class="cover-gradient"></div>
      <div class="cover-content">
        <h1 class="cover-title">{{ frontmatter.title }}</h1>
        <div class="cover-meta">
          <span class="meta-item">
            <i class="fas fa-calendar"></i>
            {{ formatDate(frontmatter.date) }}
          </span>
          <span class="meta-item" v-if="frontmatter.readingTime">
            <i class="fas fa-clock"></i>
            {{ frontmatter.readingTime }}min
          </span>
        </div>
        <div class="cover-tags" v-if="frontmatter.tags">
          <span v-for="tag in frontmatter.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    <div class="article-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter } = useData()

const coverStyle = computed(() => ({
  backgroundImage: frontmatter.value.cover 
    ? `url(${frontmatter.value.cover})`
    : 'linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%)', // 使用渐变作为默认背景
}))

function formatDate(date) {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.article-content {
  background: var(--vp-c-bg);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
  position: relative;
  z-index: 1;
}

.article-cover {
  position: relative;
  height: 300px;
  margin-bottom: 2rem;
  border-radius: 12px;
  overflow: hidden;
}

.cover-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.7)
  );
}

.cover-content {
  position: relative;
  z-index: 1;
  padding: 2rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.cover-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.cover-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.cover-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.9rem;
  backdrop-filter: blur(4px);
}
</style> 