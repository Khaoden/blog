---
layout: page
title: Notes
aside: false
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Blog = defineAsyncComponent(() => 
  import('../.vitepress/theme/components/Blog.vue')
)
</script>

<ClientOnly>
  <Blog />
</ClientOnly>
