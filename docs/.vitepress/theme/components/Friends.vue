<template>
  <div class="friends-container">
    <div class="header-section">
      <h1 class="page-title">Network</h1>
      <p class="page-subtitle">Explore the galaxy of creators. Use <span class="key-hint">WASD</span> or <span class="key-hint">Arrows</span> to fly.</p>
    </div>

    <div class="game-wrapper bento-card">
      <canvas ref="canvas" class="game-canvas"></canvas>
      
      <!-- Tooltip Overlay -->
      <div 
        v-if="hoveredFriend" 
        class="friend-tooltip"
        :style="{ left: tooltipPos.x + 'px', top: tooltipPos.y + 'px' }"
      >
        <div class="tooltip-content">
          <img :src="hoveredFriend.avatar" class="tooltip-avatar" />
          <div class="tooltip-info">
            <h3>{{ hoveredFriend.name }}</h3>
            <p>{{ hoveredFriend.description }}</p>
            <a :href="hoveredFriend.link" target="_blank" class="visit-btn">Visit Planet <i class="fas fa-rocket"></i></a>
          </div>
        </div>
      </div>

      <div class="mobile-controls" v-if="isMobile">
        <div class="joystick-area" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          <div class="joystick-knob" :style="joystickStyle"></div>
        </div>
      </div>
    </div>

    <div class="friends-list-fallback">
      <h3 class="section-title">All Friends</h3>
      <div class="friends-grid">
        <div v-for="friend in friends" :key="friend.name" class="friend-card bento-card">
          <a :href="friend.link" target="_blank" class="card-link">
            <img :src="friend.avatar" class="card-avatar" />
            <span class="card-name">{{ friend.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { friends } from '../../config/friends'

const canvas = ref(null)
const hoveredFriend = ref(null)
const tooltipPos = ref({ x: 0, y: 0 })
const isMobile = ref(false)

// Game State
let ctx = null
let animationId = null
let width = 0
let height = 0

const player = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  size: 10,
  speed: 4,
  color: '#8b5cf6'
}

const keys = {
  w: false, a: false, s: false, d: false,
  ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
}

// Nodes
let nodes = []
let particles = []

const initGame = () => {
  if (!canvas.value) return
  ctx = canvas.value.getContext('2d')
  resize()
  
  // Initialize Player Center
  player.x = width / 2
  player.y = height / 2
  
  // Initialize Nodes
  nodes = friends.map((f, i) => {
    return {
      ...f,
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      size: 25,
      angle: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() - 0.5) * 0.002
    }
  })
  
  window.addEventListener('resize', resize)
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  canvas.value.addEventListener('click', handleCanvasClick)
  
  isMobile.value = window.innerWidth < 768
  
  animate()
}

const resize = () => {
  if (!canvas.value) return
  const parent = canvas.value.parentElement
  width = parent.clientWidth
  height = 500
  canvas.value.width = width
  canvas.value.height = height
}

const handleKeyDown = (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = true
}

const handleKeyUp = (e) => {
  if (keys.hasOwnProperty(e.key)) keys[e.key] = false
}

const handleCanvasClick = (e) => {
  const rect = canvas.value.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const clickY = e.clientY - rect.top
  
  nodes.forEach(node => {
    const dist = Math.sqrt((clickX - node.x)**2 + (clickY - node.y)**2)
    if (dist < node.size) {
      window.open(node.link, '_blank')
    }
  })
}

// Mobile Joystick Logic
let touchStart = { x: 0, y: 0 }
let joystickVec = { x: 0, y: 0 }

const handleTouchStart = (e) => {
  touchStart.x = e.touches[0].clientX
  touchStart.y = e.touches[0].clientY
}

const handleTouchMove = (e) => {
  const dx = e.touches[0].clientX - touchStart.x
  const dy = e.touches[0].clientY - touchStart.y
  const dist = Math.sqrt(dx*dx + dy*dy)
  const maxDist = 40
  
  const angle = Math.atan2(dy, dx)
  const clampDist = Math.min(dist, maxDist)
  
  joystickVec.x = Math.cos(angle) * (clampDist / maxDist)
  joystickVec.y = Math.sin(angle) * (clampDist / maxDist)
}

const handleTouchEnd = () => {
  joystickVec = { x: 0, y: 0 }
}

const joystickStyle = computed(() => {
  return {
    transform: `translate(${joystickVec.x * 40}px, ${joystickVec.y * 40}px)`
  }
})

const update = () => {
  // Movement
  let dx = 0
  let dy = 0
  
  if (keys.w || keys.ArrowUp) dy -= 1
  if (keys.s || keys.ArrowDown) dy += 1
  if (keys.a || keys.ArrowLeft) dx -= 1
  if (keys.d || keys.ArrowRight) dx += 1
  
  if (isMobile.value) {
    dx = joystickVec.x
    dy = joystickVec.y
  }
  
  // Normalize
  if (dx !== 0 || dy !== 0) {
    const len = Math.sqrt(dx*dx + dy*dy)
    if (len > 1) { // Only normalize if using keys, joystick is already 0-1
       dx /= len
       dy /= len
    }
  }
  
  player.vx += (dx * player.speed - player.vx) * 0.1
  player.vy += (dy * player.speed - player.vy) * 0.1
  
  player.x += player.vx
  player.y += player.vy
  
  // Bounds
  if (player.x < player.size) player.x = player.size
  if (player.x > width - player.size) player.x = width - player.size
  if (player.y < player.size) player.y = player.size
  if (player.y > height - player.size) player.y = height - player.size
  
// Collision / Hover
  let hit = null
  nodes.forEach(node => {
    // Orbit logic
    node.angle += node.orbitSpeed
    
    const dist = Math.sqrt((player.x - node.x)**2 + (player.y - node.y)**2)
    if (dist < player.size + node.size + 10) {
      hit = node
    }
  })
  
  if (hit) {
    hoveredFriend.value = hit
    // Clamp tooltip to screen
    let tx = hit.x
    let ty = hit.y - 80
    if (tx < 100) tx = 100
    if (tx > width - 100) tx = width - 100
    if (ty < 50) ty = hit.y + 80
    
    tooltipPos.value = { x: tx, y: ty }
  } else {
    hoveredFriend.value = null
  }
  
  // Update particle trail
  if (Math.abs(player.vx) > 0.5 || Math.abs(player.vy) > 0.5) {
    particles.push({
      x: player.x,
      y: player.y,
      life: 1.0,
      vx: -player.vx * 0.2,
      vy: -player.vy * 0.2
    })
  }
  
  // Update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].x += particles[i].vx
    particles[i].y += particles[i].vy
    particles[i].life -= 0.02
    if (particles[i].life <= 0) {
      particles.splice(i, 1)
    }
  }
}

const draw = () => {
  ctx.clearRect(0, 0, width, height)
  
  // Draw Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 1
  const gridSize = 50
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke()
  }
  
  // Draw Nodes
  nodes.forEach(node => {
    ctx.save()
    ctx.translate(node.x, node.y)
    
    // Glow
    if (hoveredFriend.value === node) {
      ctx.shadowBlur = 20
      ctx.shadowColor = '#8b5cf6'
    }
    
    // Circle
    ctx.fillStyle = '#18181b'
    ctx.strokeStyle = '#8b5cf6'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(0, 0, node.size, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    
    // Icon/Text placeholder (Image drawing is complex with async loading, so simple text/color)
    ctx.fillStyle = '#fff'
    ctx.font = '12px Inter'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(node.name.substring(0, 2).toUpperCase(), 0, 0)
    
    ctx.restore()
  })
  
  // Draw Particles
  particles.forEach(p => {
    ctx.save()
    ctx.globalAlpha = p.life
    ctx.fillStyle = '#ec4899'
    ctx.beginPath()
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  })
  
  // Draw Player
  ctx.save()
  ctx.translate(player.x, player.y)
  ctx.fillStyle = player.color
  ctx.shadowBlur = 15
  ctx.shadowColor = player.color
  ctx.beginPath()
  ctx.arc(0, 0, player.size, 0, Math.PI * 2)
  ctx.fill()
  
  // Thruster
  if (Math.abs(player.vx) > 0.1 || Math.abs(player.vy) > 0.1) {
    const angle = Math.atan2(player.vy, player.vx)
    ctx.rotate(angle + Math.PI)
    ctx.fillStyle = '#ec4899'
    ctx.beginPath()
    ctx.moveTo(0, 5)
    ctx.lineTo(15, 0)
    ctx.lineTo(0, -5)
    ctx.fill()
  }
  
  ctx.restore()
}

const animate = () => {
  update()
  draw()
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  initGame()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resize)
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  if (canvas.value) {
    canvas.value.removeEventListener('click', handleCanvasClick)
  }
})
</script>

<style scoped>
.friends-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.2rem;
}

.key-hint {
  background: rgba(255,255,255,0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
}

.game-wrapper {
  position: relative;
  width: 100%;
  height: 500px;
  background: #000;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 4rem;
  cursor: none; /* Hide cursor in game */
}

.game-canvas {
  width: 100%;
  height: 100%;
}

.friend-tooltip {
  position: absolute;
  transform: translate(-50%, -100%);
  z-index: 10;
  pointer-events: auto;
  cursor: default;
}

.tooltip-content {
  background: rgba(24, 24, 27, 0.9);
  backdrop-filter: blur(10px);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--accent-primary);
  width: 250px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.tooltip-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
  border: 2px solid var(--accent-primary);
}

.tooltip-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
}

.tooltip-info p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.visit-btn {
  display: inline-block;
  background: var(--accent-primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.visit-btn:hover {
  transform: scale(1.05);
}

.mobile-controls {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 20;
}

.joystick-area {
  width: 100px;
  height: 100px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.joystick-knob {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
}

.friends-list-fallback {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.friend-card {
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
}

.friend-card:hover {
  transform: translateY(-3px);
  border-color: var(--accent-primary);
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.card-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card-name {
  font-weight: 600;
  font-size: 0.9rem;
}
</style>
