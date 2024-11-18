<template>
  <div class="blog-container">
    <div class="blog-header">
      <h1>我的博客文章</h1>
      <p class="subtitle">分享技术与生活</p>
    </div>
    
    <div class="blog-grid">
      <div class="blog-post" v-for="post in posts" :key="post.id">
        <div class="post-content">
          <h2>{{ post.title }}</h2>
          <p class="post-date">{{ post.date }}</p>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <a :href="post.link" class="read-more">阅读更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Blog'
})

const posts = [
  {
    id: 1,
    title: '我的第一篇博客',
    date: '2024-03-20',
    excerpt: '这是我的第一篇博客文章，记录了我的学习历程...',
    link: '/blog/first-post'
  },
  {
    id: 2,
    title: '前端开发心得',
    date: '2024-03-21',
    excerpt: '分享一些前端开发中的经验和技巧...',
    link: '/blog/frontend-tips'
  }
]
</script>

<style scoped>
.blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.blog-post {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.blog-post:hover {
  transform: translateY(-5px);
}

.post-content {
  padding: 1.5rem;
}

.post-content h2 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.5rem;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.post-excerpt {
  color: #666;
  margin: 1rem 0;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  color: #3eaf7c;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}
</style> 