<template>
  <div class="theme-container">
    <div class="navbar">
      <div class="navbar-content">
        <router-link to="/" class="home-link">
          <span class="site-name">我的博客</span>
        </router-link>
        <div class="navbar-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/aboutme.html" class="nav-link">About Me</router-link>
          <router-link to="/Friends.html" class="nav-link">Friends</router-link>
          <router-link to="/welcome/" class="nav-link">Welcome</router-link>
          <router-link to="/blog/" class="nav-link">Blog</router-link>
        </div>
      </div>
    </div>
    <main class="page">
      <div class="theme-default-content">
        <Content />
      </div>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>Copyright © {{ currentYear }}-present Khaoden</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style>
.theme-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3.6rem;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 20;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.home-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.site-name {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: #2c3e50;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0 0.5rem;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3eaf7c;
}

.page {
  flex: 1;
  padding: 5rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  text-align: center;
  padding: 2rem;
  background-color: var(--c-bg);
  border-top: 1px solid var(--c-border);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.theme-default-content {
  max-width: 100% !important;
}
</style> 