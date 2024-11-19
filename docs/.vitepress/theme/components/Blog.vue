<template>
  <div class="blog-container">
    <!-- 搜索框 -->
    <div class="blog-header">
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search posts..." 
          class="search-input"
        />
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="posts-list">
      <div 
        v-for="post in filteredPosts" 
        :key="post.url"
        class="post-item"
        @click="navigateTo(post.url)"
      >
        <h2 class="post-title">
          <a :href="post.url">{{ post.frontmatter?.title || 'Untitled' }}</a>
        </h2>
        <div class="post-meta">
          <span class="post-date">
            <i class="fas fa-calendar"></i>
            {{ formatDate(post.frontmatter.date) }}
          </span>
          <span class="post-time">
            <i class="fas fa-clock"></i>
            {{ post.frontmatter.readingTime }}min
          </span>
        </div>
        <p class="post-desc">{{ post.frontmatter?.description || 'No description available' }}</p>
        <div class="post-tags">
          <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useData, useRouter } from 'vitepress'
import type { Post } from '../../types/blog'

defineOptions({
  name: 'Blog'
})

const { theme } = useData()

// 获取所有博客文章
const posts = theme.value.posts as Post[]

// 搜索和标签筛选
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

// 获取所有标签
const allTags = computed(() => {
  const tags = new Set<string>()
  posts.forEach(post => {
    post.frontmatter.tags?.forEach(tag => tags.add(tag))
  })
  return Array.from(tags)
})

// 过滤文章
const filteredPosts = computed(() => {
  return posts.filter((post: Post) => {
    // 搜索过滤
    const searchMatch = (post.frontmatter?.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.frontmatter?.description?.toLowerCase().includes(searchQuery.value.toLowerCase())) ?? false
    
    // 标签过滤
    const tagMatch = selectedTags.value.length === 0 || 
      selectedTags.value.every(tag => post.frontmatter.tags?.includes(tag))
    
    return searchMatch && tagMatch
  })
})

// 切换标签选择
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 添加 router
const router = useRouter()

// 添加导航函数
const navigateTo = (url: string) => {
  router.go(url)
}
</script>

<style scoped>
.blog-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-header {
  margin-bottom: 3rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.post-item {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  cursor: pointer;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-title {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.4;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin: 0.8rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.post-meta i {
  margin-right: 0.4rem;
}

.post-desc {
  margin: 0.8rem 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-dark);
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }
  
  .post-item {
    padding: 1rem;
  }
  
  .post-title {
    font-size: 1.2rem;
  }
}
</style> 