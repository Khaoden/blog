---
layout: doc
title: 项目介绍
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Friend = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Projects.vue')
)
</script>

<ClientOnly>
  <Friend />
</ClientOnly>