<template>
  <div class="theme">
    <div class="scanlines"></div>
    <vue-particles
      id="tsparticles"
      :options="particlesOptions"
    />
    <div class="content-wrapper">
      <component :is="layout" />
    </div>
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
const { frontmatter, isDark } = useData()

const layout = computed(() => {
  if (frontmatter.value.layout === 'Landing') return Landing
  if (frontmatter.value.layout === 'home') return Home
  if (frontmatter.value.layout === 'article') return Article
  return Layout
})

const particlesOptions = computed(() => {
  const isDarkMode = isDark.value
  
  return {
    background: {
      color: {
        value: "transparent"
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push"
        },
        onHover: {
          enable: true,
          mode: "grab"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40
        },
        push: {
          quantity: 4
        },
        grab: {
          distance: 140,
          links: {
            opacity: 1
          }
        }
      }
    },
    particles: {
      color: {
        value: isDarkMode ? "#8b5cf6" : "#7c3aed"
      },
      links: {
        color: isDarkMode ? "#ec4899" : "#db2777",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      collisions: {
        enable: true
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce"
        },
        random: false,
        speed: 1,
        straight: false
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 60
      },
      opacity: {
        value: 0.3
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    detectRetina: true
  }
})
</script>

<style scoped>
.theme {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.content-wrapper {
  position: relative;
  z-index: 10;
}

#tsparticles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>