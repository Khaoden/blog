---
layout: doc
title: Welcome
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Welcome = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Welcome.vue')
)
</script>

<ClientOnly>
  <Welcome />
</ClientOnly> 