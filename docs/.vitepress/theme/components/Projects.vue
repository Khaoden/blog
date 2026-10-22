<script setup lang="ts">
import SiteIcon from './SiteIcon.vue'
</script>
<template>
  <div class="projects-page page-width">
    <header class="page-intro">
      <span class="eyebrow">PROJECTS</span>
      <h1>边学边做<span class="heading-dot">.</span></h1>
      <p>边学边做，让一个个小想法落地。</p>
    </header>
    <a
      href="https://github.com/Khaoden/blog"
      target="_blank"
      rel="noopener noreferrer"
      class="project-card"
      ><span class="project-art"><SiteIcon name="book" :size="56" /></span>
      <div>
        <span class="eyebrow">PERSONAL WEBSITE</span>
        <h2>这本公开的笔记本</h2>
        <p>记录技术、学习与生活的个人博客。由 VitePress 和 Vue 构建，持续迭代中。</p>
        <div class="article-tags">
          <span>Vue</span><span>TypeScript</span><span>VitePress</span>
        </div>
      </div>
      <SiteIcon name="diagonal" :size="25"
    /></a>
    <p class="project-footnote">
      更多探索，可以在
      <a href="https://github.com/Khaoden" target="_blank" rel="noopener noreferrer">GitHub</a>
      上找到。
    </p>
  </div>
</template>
