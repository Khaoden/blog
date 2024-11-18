<template>
    <div class="welcome-container">
      <div class="welcome-header">
        <h1>Welcome to My Space</h1>
        <p class="subtitle">A Place to Share & Learn</p>
      </div>
      
      <div class="content">
        <div class="intro-section">
          <h2>About Me</h2>
          <p>Hi, I'm Khaoden, a passionate front-end developer who loves creating beautiful and functional web experiences.</p>
        </div>
  
        <div class="skills-section">
          <h2>Skills & Technologies</h2>
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
      </div>
    </div>
  </template>
  
  <style scoped>
  .welcome-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .welcome-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .welcome-header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    color: #666;
    font-size: 1.2rem;
  }
  
  .content {
    display: grid;
    gap: 2rem;
  }
  
  .intro-section, .skills-section {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .intro-section h2, .skills-section h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 1.8rem;
  }
  
  .intro-section p {
    line-height: 1.6;
    color: #666;
  }
  
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
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
  
  .skill-item span {
    font-size: 0.9rem;
    color: #666;
  }
  </style> 