<template>
  <div class="home-container">
    <div class="menu-grid">
      <router-link to="/" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-home"></i>
          <h2>主页</h2>
          <p>返回我的主页</p>
        </div>
      </router-link>
      
      <router-link to="/aboutme.html" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-user"></i>
          <h2>关于我</h2>
          <p>了解更多关于我</p>
        </div>
      </router-link>
      
      <router-link to="/Friends.html" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-users"></i>
          <h2>好友</h2>
          <p>查看我的朋友们</p>
        </div>
      </router-link>
      
      <router-link to="/welcome/" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-door-open"></i>
          <h2>欢迎</h2>
          <p>欢迎来到我的空间</p>
        </div>
      </router-link>
      
      <router-link to="/blog/" class="menu-item">
        <div class="menu-content">
          <i class="fas fa-blog"></i>
          <h2>博客</h2>
          <p>阅读我的文章</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  width: 100%;
}

.menu-item {
  aspect-ratio: 1;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.menu-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.menu-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.menu-content i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #3eaf7c;
}

.menu-content h2 {
  margin: 0.5rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
}

.menu-content p {
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .menu-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .menu-item {
    aspect-ratio: 2/1;
  }
}
</style> 