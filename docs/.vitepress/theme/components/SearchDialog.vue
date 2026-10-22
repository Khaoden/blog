<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useData, useRouter } from 'vitepress'
import type { Post } from '../../types/blog'
import { categoryOf, matchesQuery, titleOf } from '../utils/presentation'
import SiteIcon from './SiteIcon.vue'
const { theme } = useData()
const router = useRouter()
const dialog = ref<HTMLDialogElement>()
const input = ref<HTMLInputElement>()
const query = ref('')
const results = computed(() =>
  ((theme.value.posts || []) as Post[])
    .filter((post) => matchesQuery(post, query.value))
    .slice(0, 8)
)
function close() {
  dialog.value?.close()
}
function firstResult() {
  if (!results.value.length) return
  router.go(results.value[0].url)
  close()
}
function focusResult() {
  dialog.value?.querySelector<HTMLAnchorElement>('.search-results a')?.focus()
}
async function open() {
  query.value = ''
  if (!dialog.value?.open) dialog.value?.showModal()
  await nextTick()
  input.value?.focus()
}
defineExpose({ open })
</script>
<template>
  <dialog
    ref="dialog"
    class="search-dialog"
    aria-labelledby="search-heading"
    @keydown.esc.prevent.stop="close"
    @click="
      (event) => {
        if (event.target === dialog) close()
      }
    "
  >
    <div class="search-dialog-inner">
      <div class="search-dialog-heading">
        <h2 id="search-heading">找一篇文字</h2>
        <button type="button" class="icon-button" aria-label="关闭搜索" @click="close">
          <SiteIcon name="close" />
        </button>
      </div>
      <div class="dialog-search-input">
        <SiteIcon name="search" /><input
          ref="input"
          v-model="query"
          type="search"
          aria-label="搜索文章"
          placeholder="输入标题、关键词或标签…"
          autocomplete="off"
          @keydown.enter.prevent="firstResult"
          @keydown.down.prevent="focusResult"
        />
      </div>
      <p class="search-results-label">
        {{ query ? '搜索结果' : '随便读读' }} <span>{{ results.length }}</span>
      </p>
      <div class="search-results" aria-live="polite">
        <a v-for="post in results" :key="post.url" :href="post.url" @click="close"
          ><span
            ><small>{{ categoryOf(post) }}</small
            ><strong>{{ titleOf(post) }}</strong></span
          ><SiteIcon name="diagonal" :size="18"
        /></a>
        <div v-if="!results.length" class="empty-search">
          <SiteIcon name="search" :size="28" />
          <p>还没有找到相关的文字</p>
          <span>试试「Java」「Spring」或「算法」。</span>
        </div>
      </div>
      <p class="dialog-hint">
        <kbd>Esc</kbd> 关闭搜索
        <span>在 {{ theme.posts?.length || 0 }} 篇记录里，找一点灵感。</span>
      </p>
    </div>
  </dialog>
</template>
