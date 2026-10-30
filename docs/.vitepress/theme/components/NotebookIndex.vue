<script setup lang="ts">
import { computed } from 'vue'
import type { Post } from '../../types/blog'
import SiteIcon from './SiteIcon.vue'
import { notebookGroups, originalNotes } from '../utils/notebook'
import { titleOf } from '../utils/presentation'

const props = defineProps<{ posts: Post[] }>()
const groups = computed(() => notebookGroups(props.posts))
const shortcuts = computed(() =>
  originalNotes.filter((note) => props.posts.some((post) => post.url === note.url))
)
</script>

<template>
  <div class="notebook-index">
    <nav class="notebook-shortcuts" aria-label="常用笔记">
      <span>常用入口</span>
      <a v-for="note in shortcuts" :key="note.url" :href="note.url"
        ><SiteIcon :name="note.title.startsWith('Windows') ? 'terminal' : 'book'" :size="15" />{{
          note.title
        }}<SiteIcon name="diagonal" :size="13"
      /></a>
    </nav>
    <div class="notebook-grid">
      <details v-for="group in groups" :key="group.id" class="notebook-group" open>
        <summary>
          <SiteIcon :name="group.icon" :size="19" /><strong>{{ group.title }}</strong
          ><span>{{ group.posts.length }}</span
          ><SiteIcon name="down" :size="15" />
        </summary>
        <ul>
          <li v-for="post in group.posts" :key="post.url">
            <a :href="post.url"
              ><span>{{ post.frontmatter.shortTitle || titleOf(post) }}</span
              ><small v-if="post.hasContent === false">待整理</small
              ><SiteIcon name="diagonal" :size="14"
            /></a>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>
