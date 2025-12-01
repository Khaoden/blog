<template>
  <div class="blog-container">
    
    <div class="blog-header">
      <h1 class="page-title">Writing</h1>
      <p class="page-subtitle">Thoughts on software, design, and life.</p>
      
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Search articles..." />
      </div>
    </div>

    <!-- Featured Post -->
    <div v-if="featuredPost && !searchQuery" class="featured-section">
      <div class="section-label">Featured</div>
      <div class="featured-card bento-card" @click="navigateTo(featuredPost.url)">
        <div class="featured-content">
          <div class="meta-row">
            <span class="date">{{ formatDate(featuredPost.frontmatter.date) }}</span>
            <span class="tag" v-if="featuredPost.frontmatter.tags">{{ featuredPost.frontmatter.tags[0] }}</span>
          </div>
          <h2 class="featured-title">{{ featuredPost.frontmatter.title }}</h2>
          <p class="featured-desc">{{ featuredPost.frontmatter.description }}</p>
          <div class="read-more">Read Article <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>
    </div>

    <!-- Latest Posts -->
    <div class="latest-section">
      <div class="section-label">Latest</div>
      <div class="posts-grid">
        <div class="posts-grid-inner">
          <div 
            v-for="(post, index) in filteredPosts" 
            :key="post.url" 
            class="post-card bento-card" 
            @click="navigateTo(post.url)"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <div class="post-meta">
              <span class="date">{{ formatDate(post.frontmatter.date) }}</span>
            </div>
            <h3 class="post-title">{{ post.frontmatter.title }}</h3>
            <p class="post-desc">{{ post.frontmatter.description }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineOptions } from "vue";
import { useData, useRouter } from "vitepress";
import type { Post } from "../../types/blog";

defineOptions({ name: "Blog" });

const { theme } = useData();
const posts = computed(() => (theme.value.posts || []) as Post[]);
const searchQuery = ref("");

const featuredPost = computed(() => posts.value.length > 0 ? posts.value[0] : null);

const filteredPosts = computed(() => {
  let result = posts.value;
  if (!searchQuery.value) result = posts.value.slice(1);
  
  return result.filter((post) => {
    const title = post.frontmatter.title?.toLowerCase() || '';
    const description = post.frontmatter.description?.toLowerCase() || '';
    const query = searchQuery.value.toLowerCase();
    return title.includes(query) || description.includes(query);
  });
});

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
};

const router = useRouter();
const navigateTo = (url: string) => router.go(url);
</script>

<style scoped>
.blog-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.blog-header {
  margin-bottom: 4rem;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  max-width: 400px;
  gap: 0.8rem;
  color: var(--text-secondary);
}

.search-bar input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  width: 100%;
}

.search-bar input:focus {
  outline: none;
}

.section-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.featured-section {
  margin-bottom: 5rem;
}

.featured-card {
  padding: 3rem;
  cursor: pointer;
  background: linear-gradient(to bottom right, var(--bg-surface), #1c1c20);
}

.meta-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.tag {
  color: var(--accent-primary);
}

.featured-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.featured-desc {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  max-width: 80%;
  line-height: 1.6;
}

.read-more {
  color: var(--text-primary);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.posts-grid {
  position: relative;
}

.post-card {
  padding: 2rem;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.post-meta {
  margin-bottom: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.post-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.post-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .page-title { font-size: 2.5rem; }
  .featured-card { padding: 1.5rem; }
  .featured-title { font-size: 1.8rem; }
}

/* List Transitions */
.posts-grid-inner {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
