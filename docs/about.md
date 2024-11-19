---
layout: doc
title: About Khaoden
aside: false
sidebar: false
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