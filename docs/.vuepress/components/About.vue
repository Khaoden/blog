<template>
  <div class="about-container">
    <div class="profile-section">
      <div class="avatar">
        <img src="/images/avatar.jpg" alt="Profile Picture">
      </div>
      <h1>About Me</h1>
      <p class="title">Front-end Developer</p>
    </div>

    <div class="content-section">
      <div class="info-card">
        <h2><i class="fas fa-user"></i> Who Am I</h2>
        <p>Hi, I'm Khaoden, a passionate front-end developer focused on creating beautiful and user-friendly web experiences.</p>
      </div>

      <div class="info-card">
        <h2><i class="fas fa-code"></i> Skills</h2>
        <div class="skills-grid">
          <div class="skill-item">
            <i class="fab fa-html5"></i>
            <span>HTML5</span>
          </div>
          <div class="skill-item">
            <i class="fab fa-css3-alt"></i>
            <span>CSS3</span>
          </div>
          <div class="skill-item">
            <i class="fab fa-js"></i>
            <span>JavaScript</span>
          </div>
          <div class="skill-item">
            <i class="fab fa-vuejs"></i>
            <span>Vue.js</span>
          </div>
        </div>
      </div>

      <div class="info-card">
        <h2><i class="fas fa-heart"></i> Interests</h2>
        <ul class="interests-list">
          <li>Web Development</li>
          <li>UI/UX Design</li>
          <li>Open Source</li>
          <li>New Technologies</li>
        </ul>
      </div>

      <div class="info-card">
        <h2><i class="fas fa-paper-plane"></i> Contact</h2>
        <div class="contact-links">
          <a href="https://github.com/Khaoden" target="_blank">
            <i class="fab fa-github"></i> GitHub
          </a>
          <a href="mailto:your.email@example.com">
            <i class="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-section {
  text-align: center;
  margin-bottom: 3rem;
}

.avatar {
  width: 150px;
  height: 150px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.title {
  color: #666;
  font-size: 1.2rem;
  margin-top: 0.5rem;
}

.content-section {
  display: grid;
  gap: 2rem;
}

.info-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.info-card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-card h2 i {
  color: #3eaf7c;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 6px;
  transition: transform 0.3s;
}

.skill-item:hover {
  transform: translateY(-5px);
}

.skill-item i {
  font-size: 2rem;
  color: #3eaf7c;
}

.interests-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.interests-list li {
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  text-align: center;
}

.contact-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-links a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style> 