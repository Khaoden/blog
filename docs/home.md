---
layout: doc
---

<script setup>
import { defineAsyncComponent } from 'vue'
const Home = defineAsyncComponent(() => 
  import('./.vitepress/theme/components/Home.vue')
)
</script>

<ClientOnly>
  <Home />
</ClientOnly> 