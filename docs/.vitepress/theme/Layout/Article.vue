<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <div class="reading-progress-container">
        <div class="reading-progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
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
import { ref, onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import ArticleLayout from '../components/ArticleLayout.vue'

const progress = ref(0)

const updateProgress = () => {
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  progress.value = (scrollTop / docHeight) * 100
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
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

.reading-progress-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  z-index: 100;
  background: transparent;
}

.reading-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-1));
  width: 0%;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px var(--vp-c-brand);
}
</style>