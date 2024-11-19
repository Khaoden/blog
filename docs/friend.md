---
layout: doc
title: 友情链接
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Friend = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Friends.vue')
)
</script>

<ClientOnly>
  <Friend />
</ClientOnly>