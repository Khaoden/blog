<template>
  <div class="landing-page">
    <div class="content">
      <div class="avatar">
        <img src="/images/avatar.jpg" alt="avatar" />
      </div>
      <h1>Khaoden</h1>
      <p class="bio">Front-end Developer</p>
      <div class="links">
        <a href="/home/" class="enter-btn">进入博客</a>
        <div class="social-links">
          <a
            href="https://github.com/Khaoden"
            target="_blank"
            class="social-link"
          >
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
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
