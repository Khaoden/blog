---
layout: doc
title: Khaoden's Projects
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