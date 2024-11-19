<template>
  <div class="blog-container">
    <div class="blog-header">
      <div class="search-box">
        <i class="fas fa-search search-icon"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search posts..."
          class="search-input"
        />
      </div>

      <!-- 添加标签筛选器 -->
      <div class="tags-filter">
        <span
          v-for="tag in allTags"
          :key="tag"
          :class="['filter-tag', { active: selectedTags.includes(tag) }]"
          @click="toggleTag(tag)"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="posts-list">
      <div
        v-for="post in filteredPosts"
        :key="post.url"
        class="post-item"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        @click="navigateTo(post.url)"
      >
        <div class="post-content">
          <h2 class="post-title">
            <span class="title-link" @click="navigateTo(post.url)">
              {{ post.frontmatter?.title || "Untitled" }}
            </span>
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
          <p class="post-desc">
            {{ post.frontmatter?.description || "No description available" }}
          </p>
          <div class="post-tags">
            <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useData, useRouter } from "vitepress";
import type { Post } from "../../types/blog";

defineOptions({
  name: "Blog",
});

const { theme } = useData();

// 获取所有博客文章
const posts = theme.value.posts as Post[];

// 搜索和标签筛选
const searchQuery = ref("");
const selectedTags = ref<string[]>([]);

// 获取所有标签
const allTags = computed(() => {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
});

// 过滤文章
const filteredPosts = computed(() => {
  return posts.filter((post: Post) => {
    // 搜索过滤
    const searchMatch =
      (post.frontmatter?.title
        ?.toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
        post.frontmatter?.description
          ?.toLowerCase()
          .includes(searchQuery.value.toLowerCase())) ??
      false;

    // 标签过滤
    const tagMatch =
      selectedTags.value.length === 0 ||
      selectedTags.value.every((tag) => post.frontmatter.tags?.includes(tag));

    return searchMatch && tagMatch;
  });
});

// 切换标签选择
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

// 格式化日期
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// 添加 router
const router = useRouter();

// 添加导航函数
const navigateTo = (url: string) => {
  router.go(url);
};
</script>

<style scoped>
a, h2 {
  text-decoration: none;
}

.blog-container {
  width: 55%;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.blog-header {
  margin-bottom: 3rem;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-2);
}

.search-input {
  width: 100%;
  padding: 1rem 1rem 1rem 2.5rem;
  font-size: 1rem;
  border: 2px solid transparent;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-rgb), 0.1);
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filter-tag {
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

.filter-tag:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-1px);
}

.filter-tag.active {
  background: var(--vp-c-brand);
  color: white;
}

.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.post-item {
  border-radius: 16px;
  background: var(--vp-c-bg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.post-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.post-content {
  padding: 1.5rem;
}

.post-title {
  margin: 0;
  font-size: 1.4rem;
  line-height: 1.4;
}

.title-link:hover {
  color: var(--vp-c-brand);
  background-position: 0% 100%;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(var(--vp-c-brand-rgb), 0.2);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .blog-container {
    padding: 1rem;
  }

  .posts-list {
    grid-template-columns: 1fr;
  }

  .post-item {
    margin-bottom: 1rem;
  }
}

/* 暗色主题适配 */
:root.dark .post-item {
  background: var(--vp-c-bg-soft);
}

:root.dark .post-item:hover {
  background: var(--vp-c-bg-mute);
}
</style>
