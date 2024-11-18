<template>
  <div class="home-container">
    <!-- 3D 粒子背景 -->
    <div id="particles-js" class="particles-container"></div>

    <!-- 动态波浪效果 -->
    <div class="wave-container">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>

    <!-- 英雄区域 -->
    <div class="hero-section">
      <!-- 3D 卡片效果 -->
      <div class="hero-card" data-tilt>
        <h1 class="title animate__animated animate__fadeInDown">
          <span class="gradient-text">{{ frontmatter.hero.name }}</span>
        </h1>
        <p class="text animate__animated animate__fadeIn animate__delay-1s">
          <TypeWriter :text="frontmatter.hero.text" :delay="100" />
        </p>
        <p class="tagline animate__animated animate__fadeIn animate__delay-2s">
          {{ frontmatter.hero.tagline }}
        </p>
        
        <!-- 发光按钮 -->
        <div class="actions animate__animated animate__fadeInUp animate__delay-2s">
          <a class="action-button primary glow-effect" :href="frontmatter.hero.actions[0].link">
            <span class="button-content">{{ frontmatter.hero.actions[0].text }}</span>
            <div class="glow-container">
              <div class="glow"></div>
            </div>
          </a>
          <a class="action-button secondary neon-effect" :href="frontmatter.hero.actions[1].link" target="_blank">
            <i class="fab fa-github"></i>
            <span class="button-content">{{ frontmatter.hero.actions[1].text }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 技能展示区 -->
    <div class="skills-section">
      <h2 class="section-title">Skills & Technologies</h2>
      <div class="skills-container">
        <div v-for="(skill, index) in skills" 
             :key="index"
             class="skill-item animate__animated animate__fadeIn"
             :style="{ animationDelay: `${index * 100}ms` }">
          <i :class="skill.icon"></i>
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
        </div>
      </div>
    </div>

    <!-- 特性区域 -->
    <div class="features">
      <div v-for="(feature, index) in frontmatter.features" 
           :key="index" 
           class="feature-card glass-effect animate__animated animate__fadeInUp"
           :style="{ animationDelay: `${index * 200}ms` }">
        <div class="feature-icon">
          <i :class="getFeatureIcon(index)"></i>
        </div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.details }}</p>
        <!-- 悬浮时显示的装饰元素 -->
        <div class="card-decoration"></div>
      </div>
    </div>

    <!-- 统计数据展示 -->
    <div class="stats-section">
      <div v-for="(stat, index) in stats" 
           :key="index"
           class="stat-item animate__animated animate__fadeIn"
           :style="{ animationDelay: `${index * 150}ms` }">
        <div class="stat-number">
          <CountUp :endVal="stat.value" :duration="2.5" />
        </div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import 'animate.css'
import VanillaTilt from 'vanilla-tilt'
import { tsParticles } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import CountUp from 'vue-countup-v3'
import TypeWriter from './TypeWriter.vue'

// 技能数据
const skills = [
  { name: 'Spring', level: 90, icon: 'fab fa-java' },
  { name: 'Vue.js', level: 85, icon: 'fab fa-vuejs' },
  { name: 'JavaScript', level: 80, icon: 'fab fa-js' },
  { name: 'Python', level: 75, icon: 'fab fa-python' },
  { name: 'Linux', level: 70, icon: 'fab fa-linux' },
]

// 统计数据
const stats = [
  { value: 100, label: 'Projects' },
  { value: 1000, label: 'Commits' },
  { value: 50, label: 'Articles' },
  { value: 10000, label: 'Lines of Code' },
]

onMounted(async () => {
  // 初始化 3D 倾斜效果
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
  })

  // 初始化粒子效果
  await loadSlim(tsParticles)
  await tsParticles.load("particles-js", {
    fullScreen: {
      enable: false
    },
    background: {
      color: "transparent"
    },
    fpsLimit: 60,
    particles: {
      color: {
        value: "#41d1ff"
      },
      links: {
        color: "#41d1ff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out"
        }
      },
      number: {
        value: 80,
        density: {
          enable: true,
          area: 800
        }
      },
      opacity: {
        value: 0.5
      },
      shape: {
        type: "circle"
      },
      size: {
        value: { min: 1, max: 3 }
      }
    },
    detectRetina: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse"
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          quantity: 4
        }
      }
    }
  })
})

const { frontmatter } = useData()

const getFeatureIcon = (index) => {
  const icons = ['fas fa-code', 'fas fa-book', 'fas fa-project-diagram']
  return icons[index]
}
</script>

<style scoped>
.home-container {
  position: relative;
  padding: 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  min-height: calc(100vh - 64px - 48px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* 背景动画 */
.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.circle-container {
  position: absolute;
  transform: translateY(-10vh);
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  left: calc(random(100) * 1%);
  animation-duration: calc(10s + random(10) * 1s);
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--vp-c-brand);
  mix-blend-mode: screen;
  opacity: 0.1;
}

@keyframes float-up {
  from {
    transform: translateY(100vh);
    opacity: 1;
  }
  to {
    transform: translateY(-10vh);
    opacity: 0;
  }
}

.circle-container {
  position: absolute;
  width: 10px;
  height: 10px;
  animation: float-up 15s infinite linear;
}

.hero-section {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.gradient-text {
  background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50% }
  50% { background-position: 100% 50% }
  100% { background-position: 0% 50% }
}

.title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.text {
  font-size: 1.8rem;
  color: var(--vp-c-text-1);
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-button {
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.action-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.action-button:hover::before {
  left: 100%;
}

.action-button.primary {
  background: var(--vp-c-brand);
  color: white;
}

.action-button.secondary {
  border: 2px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  padding-bottom: 2rem;
}

.feature-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(225deg, transparent 0%, rgba(255, 255, 255, 0.05) 100%);
  z-index: 1;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--vp-c-brand);
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }
  
  .text {
    font-size: 1.5rem;
  }
  
  .actions {
    flex-direction: column;
  }
}

/* 暗色主题适配 */
:root.dark .feature-card {
  background: rgba(255, 255, 255, 0.05);
}

:root.dark .feature-card:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* 添加响应式布局优化 */
@media (max-height: 800px) {
  .home-container {
    padding: 1rem 2rem;
  }
  
  .hero-section {
    margin-bottom: 1rem;
  }
  
  .title {
    font-size: 2.8rem;
  }
  
  .text {
    font-size: 1.5rem;
  }
  
  .features {
    margin-top: 1rem;
  }
  
  .feature-card {
    padding: 1.2rem;
  }
}

/* 添加更小屏幕的优化 */
@media (max-width: 480px) {
  .home-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .text {
    font-size: 1.2rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
  
  .feature-card {
    padding: 1rem;
  }
}

/* 添加卡片内容的动画效果 */
.feature-card h3 {
  transition: transform 0.3s ease;
}

.feature-card:hover h3 {
  transform: translateY(-5px);
}

.feature-card p {
  transition: opacity 0.3s ease;
}

.feature-card:hover p {
  opacity: 0.9;
}

/* 优化暗色主题 */
:root.dark .home-container {
  background: linear-gradient(to bottom, 
    rgba(0, 0, 0, 0.2), 
    rgba(0, 0, 0, 0.1)
  );
}

:root.dark .feature-card {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 粒子容器 */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

/* 波浪效果 */
.wave-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  z-index: -1;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: url('path-to-wave-svg.svg') repeat-x;
  animation: wave 10s linear infinite;
  opacity: 0.1;
}

.wave:nth-child(2) {
  animation-delay: -5s;
  opacity: 0.05;
}

.wave:nth-child(3) {
  animation-delay: -2s;
  opacity: 0.02;
}

@keyframes wave {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* 技能展示区样式 */
.skills-section {
  margin: 4rem 0;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  position: relative;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.skill-level {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: var(--vp-c-brand);
  transition: width 1.5s ease-in-out;
}

/* 发光按钮效果 */
.glow-effect {
  position: relative;
  overflow: hidden;
}

.glow {
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
  animation: glow-spin 4s linear infinite;
}

@keyframes glow-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 统计数据样式 */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--vp-c-brand);
}

.stat-label {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
}

/* 玻璃态效果 */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 装饰元素 */
.card-decoration {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, var(--vp-c-brand) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .card-decoration {
  opacity: 0.1;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .skills-container {
    grid-template-columns: 1fr;
  }
}
</style> 