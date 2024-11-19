---
layout: doc
title: About Khaoden
---

<script setup>
import { defineAsyncComponent } from 'vue'
const About = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/About.vue')
)
</script>

<ClientOnly>
  <About />
</ClientOnly> 