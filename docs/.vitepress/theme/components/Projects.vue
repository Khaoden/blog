<template>
  <div class="projects-container">
    <div class="projects-header">
      <h1 class="title">My Projects</h1>
      <p class="subtitle">A collection of my personal and open source projects</p>
    </div>

    <div class="projects-grid">
      <div 
        v-for="project in projects" 
        :key="project.name"
        class="project-card"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <div class="project-content">
          <h2 class="project-title">{{ project.name }}</h2>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span 
              v-for="tech in project.technologies" 
              :key="tech" 
              class="tech-tag"
            >
              {{ tech }}
            </span>
          </div>
          <div class="project-links">
            <a 
              v-if="project.github" 
              :href="project.github" 
              target="_blank" 
              class="project-link"
            >
              <i class="fab fa-github"></i> Source
            </a>
            <a 
              v-if="project.demo" 
              :href="project.demo" 
              target="_blank" 
              class="project-link"
            >
              <i class="fas fa-external-link-alt"></i> Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
  name: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
}

const projects = ref<Project[]>([
  {
    name: 'Project One',
    description: 'A description of your first project',
    technologies: ['Vue', 'TypeScript', 'Vite'],
    github: 'https://github.com/yourusername/project-one',
    demo: 'https://project-one.demo.com'
  },
  {
    name: 'Project Two',
    description: 'A description of your second project',
    technologies: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/project-two'
  }
])
</script>

<style scoped>
.projects-container {
  margin: 0 auto;
  width: 55%;
  padding: 2rem 4rem;
}

.projects-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--vp-c-brand), var(--vp-c-brand-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  border-radius: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
  overflow: hidden;
}

.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-brand);
}

.project-content {
  padding: 1.5rem;
}

.project-title {
  font-size: 1.4rem;
  margin: 0 0 1rem 0;
}

.project-description {
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.6;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  background: rgba(var(--vp-c-brand-rgb), 0.1);
  color: var(--vp-c-brand);
  font-size: 0.8rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: var(--vp-c-bg-mute);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .projects-container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

/* 暗色主题适配 */
:root.dark .project-card {
  background: var(--vp-c-bg-soft);
}

:root.dark .project-card:hover {
  background: var(--vp-c-bg-mute);
}
</style>
