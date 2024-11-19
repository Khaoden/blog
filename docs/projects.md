---
layout: page
title: Khaoden's Projects
aside: false
sidebar: false
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Projects = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Projects.vue')
)
</script>

<ClientOnly>
  <Projects />
</ClientOnly>