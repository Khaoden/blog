<template>
  <div class="theme-container">
    <header class="navbar">
      <div class="navbar-content">
        <a href="/" class="home-link">
          <span class="site-name">我的博客</span>
        </a>
        <div class="navbar-links">
          <a href="/" class="nav-link">主页</a>
          <a href="/about/" class="nav-link">关于我</a>
          <a href="/Friends" class="nav-link">友链</a>
          <a href="/welcome/" class="nav-link">欢迎</a>
          <a href="/blog/" class="nav-link">博客</a>
        </div>
      </div>
    </header>
    <main class="page">
      <div class="theme-default-content">
        <Content />
      </div>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <p>Copyright © {{ new Date().getFullYear() }}-present Khaoden</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Component logic here if needed
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  margin: -3.6rem auto 0;
  padding: 0;
}

.content {
  text-align: center;
  padding: 2rem;
}

.avatar {
  width: 150px;
  height: 150px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

h1 {
  font-size: 2.5rem;
  margin: 1rem 0;
  color: #2c3e50;
}

.bio {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.2rem;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.enter-btn {
  padding: 0.8rem 2rem;
  background: #3eaf7c;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 1.1rem;
}

.enter-btn:hover {
  background: #2c8f63;
  transform: translateY(-2px);
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
}

.social-link:hover {
  color: #3eaf7c;
  transform: scale(1.1);
}
</style> 