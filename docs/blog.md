---
layout: doc
title: Khaoden'sBlog
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