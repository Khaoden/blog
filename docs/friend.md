---
layout: doc
title: Khaoden's Friends
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