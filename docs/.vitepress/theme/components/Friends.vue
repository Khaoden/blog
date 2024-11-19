<template>
  <div class="friends-container">
    <div class="background-animation">
      <div v-for="n in 10" :key="n" class="circle"></div>
    </div>

    <div class="calendar">
      <div class="calendar-header">
        {{ new Date().getFullYear() }}
      </div>
      <div class="calendar-body">
        {{ new Date().getDate() }}
      </div>
    </div>

    <div class="friends-header">
      <h1 class="title animate__animated animate__fadeInDown">Friends</h1>
      <div class="marquee-container">
        <div class="marquee">
          <p class="description animate__animated animate__fadeIn">
            {{ marqueeText.repeat(3) }}
          </p>
        </div>
      </div>
    </div>

    <div class="friends-grid">
      <div v-for="(friend, index) in friends" 
           :key="friend.name" 
           class="friend-card"
           v-motion
           :initial="{ opacity: 0, y: 50 }"
           :enter="{ opacity: 1, y: 0, transition: { delay: index * 100 } }">
        <a :href="friend.link" target="_blank" rel="noopener noreferrer" class="card-link">
          <div class="card-content">
            <div class="avatar-wrapper">
              <img :src="friend.avatar" :alt="friend.name" class="avatar">
              <div class="avatar-overlay"></div>
            </div>
            <div class="info">
              <h3 class="name">{{ friend.name }}</h3>
              <div class="bio-container">
                <p class="bio" :title="friend.description">{{ friend.description }}</p>
              </div>
              <div class="tags" v-if="friend.tags">
                <span v-for="tag in friend.tags" 
                      :key="tag" 
                      class="tag">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { friends } from '../../config/friends'
const marqueeText = '欢迎交换友链 👋 Welcome to be friends 🎉 '
</script>

<style scoped>
.friends-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height));
  overflow-x: hidden;
}

.friends-header {
  text-align: center;
  padding: 3rem 1rem 2rem;
  background: linear-gradient(180deg, 
    rgba(var(--vp-c-brand-rgb), 0.1) 0%,
    transparent 100%);
  margin: 0;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  background: linear-gradient(120deg, var(--vp-c-brand) 30%, var(--vp-c-brand-light));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0 0 1rem 0;
  padding: 0.5rem 0;
  line-height: 1.2;
}

.description {
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.friend-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.friend-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.15);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  gap: 1.2rem;
  height: 100%;
}

.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.friend-card:hover .avatar {
  transform: scale(1.1);
}

.info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bio-container {
  flex: 1;
  margin: 0.5rem 0;
}

.bio {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.tag {
  padding: 0.1rem 0.2rem;
  border-radius: 12px;
  font-size: 0.85rem;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  transition: all 0.3s ease;
  white-space: nowrap;
  line-height: 1.2;
  font-weight: 500;
}

.tag:hover {
  transform: translateY(-2px);
  background: rgba(var(--vp-c-brand-rgb), 0.2);
  box-shadow: 0 2px 6px rgba(var(--vp-c-brand-rgb), 0.2);
}

.add-friend {
  margin-top: 4rem;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.format-example {
  background: var(--vp-c-bg-mute);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  font-family: monospace;
}

:root.dark .friend-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

:root.dark .friend-card:hover {
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 768px) {
  .friends-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    padding: 1rem;
  }

  .friends-header {
    padding: 2rem 1rem 1rem;
  }

  .calendar {
    display: none;
  }

  .card-content {
    padding: 1.2rem;
  }
  
  .tags {
    justify-content: flex-start;
    margin-top: 0.6rem;
  }
  
  .tag {
    padding: 0.35rem 0.8rem;
    font-size: 0.8rem;
  }
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.circle {
  position: absolute;
  background: var(--vp-c-brand);
  border-radius: 50%;
  opacity: 0.1;
  animation: float 15s infinite;
}

.circle:nth-child(1) { width: 100px; height: 100px; left: 10%; top: 20%; }
.circle:nth-child(2) { width: 150px; height: 150px; right: 15%; top: 40%; animation-delay: -2s; }
.circle:nth-child(3) { width: 80px; height: 80px; left: 20%; bottom: 30%; animation-delay: -4s; }
.circle:nth-child(4) { width: 120px; height: 120px; right: 25%; bottom: 20%; animation-delay: -6s; }
.circle:nth-child(5) { width: 90px; height: 90px; left: 40%; top: 60%; animation-delay: -8s; }
.circle:nth-child(6) { width: 70px; height: 70px; right: 40%; top: 30%; animation-delay: -10s; }
.circle:nth-child(7) { width: 110px; height: 110px; left: 35%; bottom: 40%; animation-delay: -12s; }
.circle:nth-child(8) { width: 60px; height: 60px; right: 30%; top: 70%; animation-delay: -14s; }
.circle:nth-child(9) { width: 130px; height: 130px; left: 25%; top: 45%; animation-delay: -16s; }
.circle:nth-child(10) { width: 85px; height: 85px; right: 35%; bottom: 35%; animation-delay: -18s; }

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(10px, 10px) rotate(5deg); }
  50% { transform: translate(-5px, 15px) rotate(-5deg); }
  75% { transform: translate(-10px, -5px) rotate(3deg); }
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.friend-card:hover .avatar-overlay {
  opacity: 1;
}

.friends-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(180deg, 
    rgba(var(--vp-c-brand-rgb), 0.1) 0%,
    transparent 100%);
  z-index: -1;
  border-radius: 0 0 50% 50%;
}

.marquee-container {
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
}

.marquee {
  white-space: nowrap;
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.calendar {
  position: fixed;
  top: calc(var(--vp-nav-height) + 20px);
  right: 20px;
  width: 80px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.calendar-header {
  background: var(--vp-c-brand);
  color: white;
  text-align: center;
  padding: 4px;
  font-size: 0.8rem;
}

.calendar-body {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  color: var(--vp-c-text-1);
}

:root.dark .friends-container {
  background: var(--vp-c-bg);
}

:root.dark .friends-header {
  background: linear-gradient(180deg, 
    rgba(var(--vp-c-brand-rgb), 0.05) 0%,
    transparent 100%);
}

:root.dark .tag {
  background: rgba(var(--vp-c-brand-rgb), 0.15);
}

:root.dark .tag:hover {
  background: rgba(var(--vp-c-brand-rgb), 0.25);
}
</style>
