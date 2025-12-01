<template>
  <div class="home-container">
    <div class="bento-grid">
      
      <!-- Hero Tile (Large) -->
      <div 
        class="tile hero-tile bento-card" 
        data-tilt 
        style="animation-delay: 0ms"
      >
        <div class="hero-content">
          <div class="status-badge">
            <span class="status-dot"></span>
            Available for work
          </div>
          <h1 class="hero-title">
            Building digital <br>
            <span class="text-gradient glitch-text" data-text="experiences">experiences</span> that matter.
          </h1>
          <p class="hero-desc">
            Backend AI Application Developer. Building intelligent systems with Java, Golang, Python, and LangChain.
          </p>
          <div class="hero-actions">
            <a class="btn-primary" href="/about">
              About Me <i class="fas fa-arrow-right"></i>
            </a>
            <a class="btn-secondary" href="https://github.com/Khaoden" target="_blank">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>

      <!-- Location Tile (Medium) -->
      <div 
        class="tile location-tile bento-card"
        style="animation-delay: 100ms"
      >
        <div class="map-bg"></div>
        <div class="location-content">
          <i class="fas fa-map-marker-alt location-icon"></i>
          <span class="location-text">Based in Earth</span>
          <span class="time-text">{{ currentTime }}</span>
        </div>
      </div>

      <!-- Tech Stack Tile (Medium - Marquee) -->
      <div 
        class="tile tech-tile bento-card"
        style="animation-delay: 200ms"
      >
        <h3 class="tile-title">Tech Stack</h3>
        <div class="marquee-wrapper">
          <div class="marquee-content">
            <i class="fab fa-java"></i>
            <i class="fab fa-python"></i>
            <i class="fab fa-golang"></i>
            <i class="fab fa-vuejs"></i>
            <i class="fab fa-docker"></i>
            <i class="fab fa-node"></i>
            <i class="fab fa-aws"></i>
            <!-- Duplicate for seamless loop -->
            <i class="fab fa-java"></i>
            <i class="fab fa-python"></i>
            <i class="fab fa-golang"></i>
            <i class="fab fa-vuejs"></i>
          </div>
        </div>
      </div>

      <!-- Socials Tile (Small) -->
      <div 
        class="tile social-tile bento-card"
        style="animation-delay: 300ms"
      >
        <a href="https://twitter.com" target="_blank" class="social-link twitter">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" class="social-link linkedin">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a href="mailto:hello@example.com" class="social-link mail">
          <i class="fas fa-envelope"></i>
        </a>
      </div>

      <!-- Stats Tile (Small) -->
      <div 
        class="tile stats-tile bento-card"
        style="animation-delay: 400ms"
      >
        <div class="stat-item">
          <span class="stat-num">3+</span>
          <span class="stat-label">Years Exp.</span>
        </div>
        <div class="stat-item">
          <span class="stat-num">50+</span>
          <span class="stat-label">Projects</span>
        </div>
      </div>

      <!-- Blog Preview Tile (Wide) -->
      <div 
        class="tile blog-tile bento-card"
        style="animation-delay: 500ms"
      >
        <div class="tile-header">
          <h3 class="tile-title">Latest Thoughts</h3>
          <a href="/blog" class="view-all">View All</a>
        </div>
        <div class="blog-preview-list">
          <div v-for="i in 2" :key="i" class="blog-preview-item">
            <span class="preview-date">Oct {{ 20 + i }}</span>
            <span class="preview-title">Exploring the future of web development</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import VanillaTilt from 'vanilla-tilt'

const currentTime = ref('')
let timer = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
  
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.1,
    scale: 1.02
  })
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, minmax(180px, auto));
  gap: 1.5rem;
  width: 100%;
}

/* Tile Base Styling & Animation */
.tile {
  animation: fadeInUp 0.8s ease-out both;
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

/* Tile Specifics */
.hero-tile {
  grid-column: span 2;
  grid-row: span 2;
  justify-content: center;
  background: radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 40%), var(--bg-surface);
}

.location-tile {
  grid-column: span 1;
  grid-row: span 1;
  position: relative;
  align-items: center;
  justify-content: center;
}

.tech-tile {
  grid-column: span 1;
  grid-row: span 1;
  justify-content: center;
  overflow: hidden;
}

.social-tile {
  grid-column: span 1;
  grid-row: span 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.stats-tile {
  grid-column: span 1;
  grid-row: span 1;
  justify-content: space-around;
}

.blog-tile {
  grid-column: span 2;
  grid-row: span 1;
}

/* Hero Content */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.hero-title {
  font-size: 2.5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-desc {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 90%;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

/* Location Tile */
.map-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23333' fill-opacity='0.2' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
  z-index: 0;
}

.location-content {
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.location-icon {
  font-size: 2rem;
  color: var(--accent-primary);
  margin-bottom: 0.5rem;
}

.location-text {
  font-weight: 600;
}

.time-text {
  color: var(--text-secondary);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
}

/* Tech Marquee */
.marquee-wrapper {
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
}

.marquee-content {
  display: flex;
  gap: 2rem;
  animation: scroll 10s linear infinite;
  padding: 1rem 0;
}

.marquee-content i {
  font-size: 2.5rem;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.marquee-content i:hover {
  color: var(--text-primary);
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Socials */
.social-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-secondary);
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.social-link:hover {
  background: var(--text-primary);
  color: var(--bg-depth);
  transform: translateY(-3px);
}

/* Stats */
.stat-item {
  text-align: center;
}

.stat-num {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Blog Preview */
.tile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.tile-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.view-all {
  font-size: 0.9rem;
  color: var(--accent-primary);
  text-decoration: none;
}

.blog-preview-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.blog-preview-item:last-child {
  border-bottom: none;
}

.preview-date {
  color: var(--text-tertiary);
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
}

.preview-title {
  font-weight: 500;
}

/* Responsive */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-tile { grid-column: span 2; }
  .blog-tile { grid-column: span 2; }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-tile, .blog-tile, .location-tile, .tech-tile, .social-tile, .stats-tile {
    grid-column: span 1;
    grid-row: auto;
  }
  
  .hero-title { font-size: 2rem; }
}

/* Glitch Effect */
.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-surface);
}

.glitch-text::before {
  left: 2px;
  text-shadow: -1px 0 #ff00c1;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: -1px 0 #00fff9;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(30px, 9999px, 10px, 0); }
  5% { clip: rect(85px, 9999px, 81px, 0); }
  10% { clip: rect(25px, 9999px, 69px, 0); }
  15% { clip: rect(4px, 9999px, 88px, 0); }
  20% { clip: rect(15px, 9999px, 2px, 0); }
  25% { clip: rect(66px, 9999px, 24px, 0); }
  30% { clip: rect(1px, 9999px, 81px, 0); }
  35% { clip: rect(79px, 9999px, 54px, 0); }
  40% { clip: rect(23px, 9999px, 16px, 0); }
  45% { clip: rect(56px, 9999px, 39px, 0); }
  50% { clip: rect(8px, 9999px, 30px, 0); }
  55% { clip: rect(87px, 9999px, 15px, 0); }
  60% { clip: rect(12px, 9999px, 63px, 0); }
  65% { clip: rect(45px, 9999px, 82px, 0); }
  70% { clip: rect(95px, 9999px, 28px, 0); }
  75% { clip: rect(3px, 9999px, 19px, 0); }
  80% { clip: rect(61px, 9999px, 73px, 0); }
  85% { clip: rect(38px, 9999px, 51px, 0); }
  90% { clip: rect(74px, 9999px, 9px, 0); }
  95% { clip: rect(19px, 9999px, 42px, 0); }
  100% { clip: rect(53px, 9999px, 94px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 100px, 0); }
  5% { clip: rect(52px, 9999px, 74px, 0); }
  10% { clip: rect(79px, 9999px, 85px, 0); }
  15% { clip: rect(75px, 9999px, 5px, 0); }
  20% { clip: rect(67px, 9999px, 61px, 0); }
  25% { clip: rect(14px, 9999px, 79px, 0); }
  30% { clip: rect(1px, 9999px, 66px, 0); }
  35% { clip: rect(86px, 9999px, 30px, 0); }
  40% { clip: rect(23px, 9999px, 98px, 0); }
  45% { clip: rect(85px, 9999px, 72px, 0); }
  50% { clip: rect(71px, 9999px, 75px, 0); }
  55% { clip: rect(2px, 9999px, 48px, 0); }
  60% { clip: rect(30px, 9999px, 16px, 0); }
  65% { clip: rect(59px, 9999px, 50px, 0); }
  70% { clip: rect(41px, 9999px, 62px, 0); }
  75% { clip: rect(2px, 9999px, 82px, 0); }
  80% { clip: rect(47px, 9999px, 73px, 0); }
  85% { clip: rect(3px, 9999px, 27px, 0); }
  90% { clip: rect(26px, 9999px, 55px, 0); }
  95% { clip: rect(42px, 9999px, 97px, 0); }
  100% { clip: rect(38px, 9999px, 49px, 0); }
}
</style>
