<template>
  <div class="about-container">
    
    <!-- Profile Header -->
    <div class="profile-section" style="animation-delay: 0ms">
      <div class="profile-card bento-card">
        <div class="profile-content">
          <div class="avatar-wrapper">
            <div class="avatar-glow"></div>
            <img :src="frontmatter.avatar || '/avatar.png'" alt="Avatar" class="avatar" />
          </div>
          <div class="profile-info">
            <h1 class="name">{{ frontmatter.name || 'Your Name' }}</h1>
            <p class="role text-accent font-mono">Backend AI Application Developer</p>
            <p class="bio">{{ frontmatter.bio || 'Building intelligent backend systems with Java, Golang, Python, and LangChain.' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3D Tech Stack -->
    <div class="section-title">Tech Universe</div>
    <div class="tech-stack-container bento-card" style="animation-delay: 100ms">
      <div class="tag-cloud">
        <div class="tag-sphere" ref="sphere">
          <span v-for="(tag, index) in tags" :key="tag" class="tag" :style="getTagStyle(index)">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>

    <!-- Experience Timeline -->
    <div class="section-title">Journey</div>
    <div class="timeline">
      <div 
        class="timeline-item" 
        v-for="(exp, index) in experience" 
        :key="index"
        :style="{ animationDelay: `${index * 100}ms` }"
      >
        <div class="timeline-dot"></div>
        <div class="timeline-content bento-card">
          <div class="exp-year font-mono">{{ exp.year }}</div>
          <h3 class="exp-role">{{ exp.role }}</h3>
          <p class="exp-company">{{ exp.company }}</p>
          <p class="exp-desc">{{ exp.desc }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const tags = [
  'Java', 'Spring Boot', 'Golang', 'Python', 'Vue.js', 'LangChain',
  'MySQL', 'Redis', 'Docker', 'Kubernetes', 'FastAPI', 'Microservices',
  'AI/ML', 'LLM', 'RAG', 'Vector DB', 'Kafka', 'gRPC', 'REST API', 'Git'
]

const experience = [
  { year: '2024', role: 'Backend AI Developer', company: 'AI Startup', desc: 'Building LLM-powered applications with LangChain and FastAPI.' },
  { year: '2022', role: 'Backend Engineer', company: 'Tech Company', desc: 'Developed microservices with Spring Boot and Golang.' },
  { year: '2020', role: 'Full Stack Developer', company: 'Software House', desc: 'Created web applications with Vue.js and Python backends.' },
]

// 3D Tag Cloud Logic
const sphere = ref(null)
let animationId = null
let angleX = 0
let angleY = 0

const getTagStyle = (index) => {
  // Initial distribution logic handled in animation loop for full 3D effect
  // But for SSR/Initial render, we can place them
  const phi = Math.acos(-1 + (2 * index) / tags.length)
  const theta = Math.sqrt(tags.length * Math.PI) * phi
  
  const x = 200 * Math.cos(theta) * Math.sin(phi)
  const y = 200 * Math.sin(theta) * Math.sin(phi)
  const z = 200 * Math.cos(phi)
  
  return {
    transform: `translate3d(${x}px, ${y}px, ${z}px)`
  }
}

const animateTags = () => {
  if (!sphere.value) return
  
  angleX += 0.002
  angleY += 0.002
  
  sphere.value.style.transform = `rotateX(${angleX * 100}deg) rotateY(${angleY * 100}deg)`
  
  animationId = requestAnimationFrame(animateTags)
}

onMounted(() => {
  animateTags()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Animations */
.profile-section,
.tech-stack-container,
.timeline-item {
  animation: fadeInUp 0.8s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-card {
  padding: 3rem;
  align-items: center;
  text-align: center;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--bg-depth);
  position: relative;
  z-index: 2;
}

.avatar-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-primary) 0%, transparent 70%);
  opacity: 0.5;
  filter: blur(10px);
  z-index: 1;
  animation: pulse-glow 3s infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
}

.name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.role {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.bio {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: -2rem;
  color: var(--text-primary);
  position: relative;
  z-index: 2;
}

/* 3D Tech Stack */
.tech-stack-container {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  overflow: hidden;
}

.tag-cloud {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
}

.tag-sphere {
  position: relative;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
}

.tag {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(4px);
  transition: color 0.3s, background 0.3s;
  will-change: transform;
}

.tag:hover {
  color: var(--accent-primary);
  background: rgba(255, 255, 255, 0.1);
  z-index: 100;
}

/* Timeline */
.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 100%;
  background: var(--border-subtle);
}

.timeline-item {
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;
  position: relative;
}

.timeline-item:nth-child(odd) {
  flex-direction: row-reverse;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: var(--bg-depth);
  border: 2px solid var(--accent-primary);
  border-radius: 50%;
  z-index: 2;
}

.timeline-content {
  width: 45%;
  margin: 0 2rem;
  position: relative;
}

.timeline-item:nth-child(odd) .timeline-content {
  text-align: right;
}

.timeline-item:nth-child(even) .timeline-content {
  text-align: left;
}

.exp-year {
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
}

.exp-role {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.exp-company {
  color: var(--text-tertiary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .timeline::before {
    left: 20px;
  }
  
  .timeline-item {
    flex-direction: row !important;
    justify-content: flex-start;
  }
  
  .timeline-dot {
    left: 20px;
  }
  
  .timeline-content {
    width: calc(100% - 60px);
    margin-left: 60px;
    margin-right: 0;
    text-align: left !important;
  }
}
</style>
