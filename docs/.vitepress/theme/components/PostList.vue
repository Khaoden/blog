<script setup lang="ts">
import type { Post } from '../../types/blog'
import { categoryOf, dateLabel, summaryOf, titleOf } from '../utils/presentation'
import SiteIcon from './SiteIcon.vue'
defineProps<{ posts: Post[] }>()
</script>
<template>
  <div class="post-list">
    <a v-for="post in posts" :key="post.url" :href="post.url" class="post-row">
      <div class="post-row-main">
        <div class="post-kicker">
          <span class="category-label">{{ categoryOf(post) }}</span
          ><span class="meta-divider">/</span
          ><time :datetime="post.frontmatter.date || undefined">{{
            dateLabel(post.frontmatter.date)
          }}</time>
        </div>
        <h3>{{ titleOf(post) }}<SiteIcon name="diagonal" :size="19" /></h3>
        <p>{{ summaryOf(post) }}</p>
        <div class="post-bottom">
          <span v-for="tag in (post.frontmatter.tags || []).slice(0, 2)" :key="tag" class="post-tag"
            ># {{ tag }}</span
          ><span class="reading-time">{{ post.frontmatter.readingTime || 1 }} 分钟阅读</span>
        </div>
      </div>
      <span class="post-arrow"><SiteIcon name="arrow" :size="21" /></span>
    </a>
  </div>
</template>
