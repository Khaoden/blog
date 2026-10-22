<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import { categories, categoryOf } from '../utils/presentation'
import SiteIcon from './SiteIcon.vue'
const { theme } = useData()
const props = defineProps<{ filterInPlace?: boolean }>()
const emit = defineEmits<{ category: [value: string] }>()
const posts = computed(() => (theme.value.posts || []) as Post[])
function chooseCategory(event: MouseEvent, value: string) {
  if (!props.filterInPlace || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return
  event.preventDefault()
  emit('category', value)
}
</script>
<template>
  <aside class="home-sidebar">
    <section class="profile-card">
      <div class="profile-card-top">
        <img src="/images/avatar.jpg" alt="Khaoden 的头像" width="56" height="56" />
        <div>
          <h3>Khaoden</h3>
          <span>开发者 · 终身学习者</span>
        </div>
        <span class="profile-spark"><SiteIcon name="sparkle" :size="18" /></span>
      </div>
      <p>写代码，做笔记，保持好奇。<br />在这里收集一些值得记录的瞬间。</p>
      <a
        href="https://github.com/Khaoden"
        target="_blank"
        rel="noopener noreferrer"
        class="profile-github"
        ><SiteIcon name="github" :size="17" /> 在 GitHub 找到我
        <SiteIcon name="diagonal" :size="15"
      /></a>
      <div class="profile-stats">
        <div>
          <strong>{{ posts.length }}</strong
          ><span>份记录</span>
        </div>
        <div>
          <strong>{{ categories.length }}</strong
          ><span>个主题</span>
        </div>
        <div><SiteIcon name="leaf" :size="23" /><span>持续生长</span></div>
      </div>
    </section>
    <section class="sidebar-categories">
      <p class="sidebar-label">顺着兴趣，继续探索</p>
      <a
        v-for="(category, index) in categories"
        :key="category"
        :href="'/blog?category=' + encodeURIComponent(category)"
        @click="chooseCategory($event, category)"
        ><span
          ><SiteIcon :name="['code', 'book', 'folder', 'leaf'][index]" :size="17" />{{
            category
          }}</span
        ><span class="category-count">{{
          posts.filter((post) => categoryOf(post) === category).length
        }}</span></a
      >
    </section>
    <a class="sidebar-friends" href="/friend"
      ><div class="neighbor-dots" aria-hidden="true">
        <span>Z</span><span>Q</span><span>↗</span>
      </div>
      <h3>去别人家坐坐</h3>
      <p>独立的站点，有趣的灵魂。<br />互联网，也可以很温暖。</p>
      <span class="text-link">逛逛友链 <SiteIcon name="arrow" :size="17" /></span
    ></a>
  </aside>
</template>
