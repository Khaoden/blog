<template>
  <div class="landing-page">
    <div class="emoji-background">
      <div v-for="(emoji, index) in backgroundEmojis" 
           :key="index" 
           class="floating-emoji"
           :style="getRandomStyle()">
        {{ emoji }}
      </div>
    </div>

    <div class="content">
      <div class="avatar">
        <img src="/images/avatar.jpg" alt="avatar" />
      </div>
      <div class="greeting">{{ frontmatter.landing.greeting }}</div>
      <h1 class="title">{{ frontmatter.landing.name }}</h1>
      <p class="role">{{ frontmatter.landing.role }}</p>
      <p class="bio">{{ frontmatter.landing.bio }}</p>
      
      <div class="welcome-section">
        <span class="welcome-emoji">✨</span>
        <span class="welcome-text">{{ frontmatter.landing.welcome }}</span>
      </div>

      <div class="links">
        <a 
          v-for="action in frontmatter.landing.actions"
          :key="action.text"
          :href="action.link" 
          class="enter-btn"
        >
          <span class="btn-icon">{{ action.icon }}</span>
          <span>{{ action.text }}</span>
        </a>
        <div class="social-links">
          <a 
            v-for="social in frontmatter.landing.social"
            :key="social.icon"
            :href="social.link" 
            target="_blank" 
            class="social-link"
          >
            <i :class="`fab fa-${social.icon}`"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'
import emojis from '../../../public/emoji/full.mjs'

const { frontmatter } = useData()

// 从emoji文件中随机选择并排列
const getRandomEmojis = (count: number) => {
  const shuffled = Object.values(emojis).sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const backgroundEmojis = ref(getRandomEmojis(30))

const getRandomStyle = () => {
  // 修改随机位置生成逻辑，使emoji更均匀分布
  const gridSize = 4 // 4x4网格
  const cellWidth = 100 / gridSize
  const cellHeight = 100 / gridSize
  
  const gridX = Math.floor(Math.random() * gridSize)
  const gridY = Math.floor(Math.random() * gridSize)
  
  // 在网格内添加一些随机偏移
  const offsetX = Math.random() * cellWidth
  const offsetY = Math.random() * cellHeight
  
  return {
    left: (gridX * cellWidth + offsetX) + 'vw',
    top: (gridY * cellHeight + offsetY) + 'vh',
    animationDuration: 15 + Math.random() * 30 + 's',
    animationDelay: -Math.random() * 20 + 's',
    opacity: 0.1 + Math.random() * 0.2,
    fontSize: 1 + Math.random() * 2 + 'rem'
  }
}
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  margin: 0;
  padding-top: 0;
  box-sizing: border-box;
}

.content {
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  position: relative;
  z-index: 1;
  background: rgba(248, 249, 250, 0.9);
  border-radius: 20px;
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border: 4px solid #fff;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.greeting {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.title {
  font-size: 2.5rem;
  margin: 0.5rem 0;
  color: #2c3e50;
  font-weight: 700;
}

.role {
  color: #3eaf7c;
  font-size: 1.2rem;
  margin: 0.5rem 0;
  font-weight: 500;
}

.bio {
  color: #666;
  margin: 1.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.welcome-section {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.welcome-emoji {
  font-size: 1.5rem;
}

.welcome-text {
  font-size: 1.2rem;
  color: #666;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.enter-btn {
  padding: 0.8rem 2rem;
  background: #3eaf7c;
  color: white;
  border-radius: 25px;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(62, 175, 124, 0.2);
}

.btn-icon {
  font-size: 1.2rem;
}

.enter-btn:hover {
  background: #2c8f63;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(62, 175, 124, 0.3);
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-link {
  font-size: 1.8rem;
  color: #666;
  text-decoration: none;
  transition: all 0.3s;
  padding: 0.5rem;
}

.social-link:hover {
  color: #3eaf7c;
  transform: scale(1.1) rotate(5deg);
}

.emoji-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.floating-emoji {
  position: fixed;
  animation: floatUpward linear infinite;
  transform: translateZ(0);
}

@keyframes floatUpward {
  from {
    transform: translateY(100vh) rotate(0deg);
  }
  to {
    transform: translateY(-100vh) rotate(360deg);
  }
}

@media (max-width: 768px) {
  .content {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .bio {
    font-size: 1rem;
  }
  .floating-emoji {
    font-size: 1rem;
  }
}
</style>
