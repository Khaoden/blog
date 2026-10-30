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
function priority(post: Post) {
  const titles = [
    titleOf(post),
    post.frontmatter.shortTitle || '',
    ...(post.frontmatter.aliases || []),
    post.url.split('/').pop() || ''
  ].map((title) => title.normalize('NFKC').toLocaleLowerCase())
  const value = query.value.trim().normalize('NFKC').toLocaleLowerCase()
  const terms = value.split(/\s+/).filter(Boolean)
  return (
    (value && titles.includes(value)
      ? 100
      : value && titles.some((title) => title.includes(value))
        ? 40
        : 0) +
    terms.filter((term) => titles.some((title) => title.includes(term))).length * 10 +
    (post.hasContent === false ? 0 : 2)
  )
}
const matchingResults = computed(() =>
  ((theme.value.posts || []) as Post[])
    .filter((post) => matchesQuery(post, query.value))
    .sort(
      (a, b) =>
        priority(b) - priority(a) ||
        (Date.parse(b.frontmatter.lastUpdated || '') || 0) -
          (Date.parse(a.frontmatter.lastUpdated || '') || 0)
    )
)
const results = computed(() => matchingResults.value.slice(0, 8))
function close() {
  dialog.value?.close()
}
function firstResult(event: KeyboardEvent) {
  if (event.isComposing) return
  event.preventDefault()
  if (!results.value.length) return
  router.go(results.value[0].url)
  close()
}
function navigateResults(event: KeyboardEvent) {
  if (event.isComposing || !['ArrowDown', 'ArrowUp'].includes(event.key)) return
  const links = Array.from(
    dialog.value?.querySelectorAll<HTMLAnchorElement>('.search-results a') || []
  )
  if (!links.length) return
  event.preventDefault()
  const current = links.findIndex((link) => link === document.activeElement)
  const direction = event.key === 'ArrowDown' ? 1 : -1
  const next =
    current < 0
      ? direction > 0
        ? 0
        : links.length - 1
      : (current + direction + links.length) % links.length
  links[next].focus()
}
function clearQuery() {
  query.value = ''
  input.value?.focus()
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
    @keydown="navigateResults"
    @keydown.esc.prevent.stop="close"
    @click="
      (event) => {
        if (event.target === dialog) close()
      }
    "
  >
    <div class="search-dialog-inner">
      <div class="search-dialog-heading">
        <h2 id="search-heading">搜索笔记</h2>
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
          placeholder="标题、正文关键词或旧文件名…"
          autocomplete="off"
          maxlength="180"
          @keydown.enter="firstResult"
        /><button
          v-if="query"
          type="button"
          class="search-clear"
          aria-label="清空搜索"
          @click="clearQuery"
        >
          <SiteIcon name="close" :size="17" />
        </button>
      </div>
      <p class="search-results-label">
        {{ query ? '搜索结果' : '最近补充'
        }}<span
          >{{
            matchingResults.length > results.length
              ? '显示 ' + results.length + ' / ' + matchingResults.length
              : results.length
          }}
          篇</span
        >
      </p>
      <div class="search-results" aria-live="polite">
        <a v-for="post in results" :key="post.url" :href="post.url" @click="close"
          ><span
            ><small
              >{{ categoryOf(post) }} ·
              {{
                post.hasContent === false
                  ? '整理中'
                  : (post.frontmatter.readingTime || 1) + ' 分钟阅读'
              }}</small
            ><strong>{{ titleOf(post) }}</strong></span
          ><SiteIcon name="diagonal" :size="18"
        /></a>
        <div v-if="!results.length" class="empty-search">
          <SiteIcon name="search" :size="28" />
          <p>还没有找到相关的文字</p>
          <span>试试「Java 数组」「Spring」或「算法」。</span>
        </div>
      </div>
      <a
        v-if="matchingResults.length > results.length"
        class="search-all-results"
        :href="'/blog?q=' + encodeURIComponent(query.trim())"
        @click="close"
        >查看全部 {{ matchingResults.length }} 篇 <SiteIcon name="arrow" :size="16"
      /></a>
      <div class="dialog-hint">
        <span class="search-keyboard-hint"><kbd>↑</kbd><kbd>↓</kbd> 选择 <kbd>Enter</kbd> 打开</span
        ><span><kbd>Esc</kbd> 关闭</span>
      </div>
    </div>
  </dialog>
</template>
