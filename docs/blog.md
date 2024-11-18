---
layout: doc
title: Blog
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