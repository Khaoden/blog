<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <div class="article-background-animation">
        <div class="article-wave-container">
          <div class="article-wave article-wave1"></div>
          <div class="article-wave article-wave2"></div>
          <div class="article-wave article-wave3"></div>
        </div>
        <div class="article-gradient-overlay"></div>
      </div>
    </template>
    <template #doc>
      <div class="article-wrapper">
        <ArticleLayout>
          <Content class="vp-doc" />
        </ArticleLayout>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import ArticleLayout from '../components/ArticleLayout.vue'
</script>

<style>
.article-wrapper {
  position: relative;
  z-index: 2;
}

.article-background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.article-wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.article-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    45deg,
    var(--vp-c-brand) 0%,
    var(--vp-c-brand-light) 100%
  );
  opacity: 0.05;
  border-radius: 50%;
  transform-origin: 50% 50%;
  animation: article-wave 25s infinite linear;
}

.article-wave1 { animation-duration: 20s; }
.article-wave2 { 
  animation-duration: 15s; 
  animation-delay: -5s;
  opacity: 0.03;
}
.article-wave3 { 
  animation-duration: 10s;
  opacity: 0.02;
}

@keyframes article-wave {
  0% { transform: translateX(0) rotate(0); }
  100% { transform: translateX(-50%) rotate(360deg); }
}
</style> 