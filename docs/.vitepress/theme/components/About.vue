<script setup lang="ts">
import SiteIcon from './SiteIcon.vue'
const interests = [
  {
    icon: 'code',
    title: '后端开发',
    text: '从 Java、Spring 到系统设计，理解原理，也关注实际问题。',
    tags: ['Java', 'Spring', 'MySQL']
  },
  {
    icon: 'sparkle',
    title: 'AI 应用',
    text: '探索大模型与日常开发的连接，把想法变成可以使用的工具。',
    tags: ['Python', 'LangChain', 'RAG']
  },
  {
    icon: 'book',
    title: '学习与记录',
    text: '用自己的语言整理知识，让每一次学习都有迹可循。',
    tags: ['算法', '阅读', '写作']
  }
]
</script>
<template>
  <div class="about-page page-width">
    <header class="page-intro">
      <span class="eyebrow">A LITTLE ABOUT ME</span>
      <h1>你好，我是 Khaoden<span class="heading-dot">.</span></h1>
      <p>一个喜欢探索，也喜欢把事情想明白的人。</p>
    </header>
    <section class="about-story">
      <div class="about-photo">
        <img src="/images/avatar.jpg" alt="Khaoden 的头像" width="240" height="240" /><span
          class="photo-caption"
          >STAY CURIOUS, ALWAYS.</span
        >
      </div>
      <div class="about-copy">
        <span class="eyebrow">写代码的人，也有自己的小世界</span>
        <h2>在问题里探索，<br />在文字里整理。</h2>
        <p>
          我是一名关注后端开发与 AI
          应用的开发者。这里是我的公开笔记本，记录从理解概念到动手实践的过程。
        </p>
        <p>
          写作对我来说，是把模糊的想法慢慢变清楚。它未必总是完整的答案，也可以是一个正在生长的问题。
        </p>
        <a
          class="primary-button"
          href="https://github.com/Khaoden"
          target="_blank"
          rel="noopener noreferrer"
          ><SiteIcon name="github" :size="18" /> 我的 GitHub <SiteIcon name="diagonal" :size="17"
        /></a>
      </div>
    </section>
    <div class="section-heading">
      <div>
        <span class="eyebrow">CURRENT INTERESTS</span>
        <h2>我在关注什么<span class="heading-dot">.</span></h2>
      </div>
    </div>
    <div class="interest-grid">
      <section v-for="interest in interests" :key="interest.title" class="interest-card">
        <span class="interest-icon"><SiteIcon :name="interest.icon" :size="24" /></span>
        <h3>{{ interest.title }}</h3>
        <p>{{ interest.text }}</p>
        <div>
          <span v-for="tag in interest.tags" :key="tag">{{ tag }}</span>
        </div>
      </section>
    </div>
    <section class="about-site">
      <div>
        <span class="eyebrow">ABOUT THIS LITTLE CORNER</span>
        <h2>一间自己的数字小屋。</h2>
        <p>
          用 VitePress 和 Vue 搭建，用文字慢慢填满。<br />如果这些笔记恰好帮到了你，那就是记录最好的意义。
        </p>
      </div>
      <a
        href="https://github.com/Khaoden/blog"
        class="text-link"
        target="_blank"
        rel="noopener noreferrer"
        >看看博客源码 <SiteIcon name="diagonal" :size="18"
      /></a>
    </section>
  </div>
</template>
