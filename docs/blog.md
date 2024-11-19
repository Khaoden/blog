---
layout: page
title: Khaoden'sBlog
aside: false
sidebar: false
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Blog = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Blog.vue')
)
</script>

<ClientOnly>
  <Blog />
</ClientOnly> 