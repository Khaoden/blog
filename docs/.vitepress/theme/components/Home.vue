<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import PostList from './PostList.vue'
import SiteIcon from './SiteIcon.vue'
import { categories, categoryOf, dateLabel, titleOf } from '../utils/presentation'

const props = withDefaults(defineProps<{ motionPaused?: boolean }>(), { motionPaused: false })
const { theme } = useData()
const tab = ref('全部')
const tilt = ref({ x: 0, y: 0 })
const posts = computed(() => (theme.value.posts || []) as Post[])
const readable = computed(() => posts.value.filter((post) => post.hasContent !== false))
const unfinished = computed(() => posts.value.length - readable.value.length)
const featured = computed(() =>
  posts.value.find((post) => post.url.endsWith('/代码随想录/数组算法'))
)
const selected = computed(() => {
  const source =
    tab.value === '全部'
      ? readable.value.filter(
          (post) =>
            Date.parse(post.frontmatter.date) <= Date.now() && post.url !== featured.value?.url
        )
      : readable.value.filter((post) => categoryOf(post) === tab.value)
  return source.slice(0, 4)
})
const focus = computed(() =>
  [
    {
      title: 'Backend',
      category: '开发笔记',
      icon: 'layers',
      detail: 'Java、Spring，与原理多走近一步。'
    },
    {
      title: 'Algorithms',
      category: '算法与面试',
      icon: 'code',
      detail: '从边界、递归到数据结构。'
    },
    {
      title: 'Tools',
      category: '工具与效率',
      icon: 'terminal',
      detail: '把重复的事情，交给好用的工具。'
    }
  ].map((item) => ({
    ...item,
    ready: readable.value.filter((post) => categoryOf(post) === item.category).length,
    pending: posts.value.filter(
      (post) => categoryOf(post) === item.category && post.hasContent === false
    ).length,
    href:
      '/blog?category=' +
      encodeURIComponent(item.category) +
      (readable.value.some((post) => categoryOf(post) === item.category) ? '' : '&view=drafts')
  }))
)
const cardStyle = computed(() => ({
  '--tilt-x': (props.motionPaused ? 0 : tilt.value.x) + 'deg',
  '--tilt-y': (props.motionPaused ? 0 : tilt.value.y) + 'deg'
}))
function moveCard(event: PointerEvent) {
  if (
    props.motionPaused ||
    event.pointerType === 'touch' ||
    !window.matchMedia('(hover: hover)').matches
  )
    return
  const box = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tilt.value = {
    x: (0.5 - (event.clientY - box.top) / box.height) * 8,
    y: ((event.clientX - box.left) / box.width - 0.5) * 8
  }
}
function resetCard() {
  tilt.value = { x: 0, y: 0 }
}
</script>

<template>
  <div class="home-page">
    <section class="orbit-hero" aria-labelledby="identity-name">
      <div class="hero-caption">
        <span class="eyebrow">KHAODEN / PERSONAL SPACE</span><span>一个人的数字角落</span>
      </div>
      <div class="orbit-universe">
        <div class="orbit-track track-inner" aria-hidden="true"></div>
        <div class="orbit-track track-outer" aria-hidden="true"></div>
        <div class="orbit-journey orbit-java">
          <div class="orbit-counter">
            <a
              href="/blog?category=%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0&view=drafts"
              class="orbit-badge java-badge"
              aria-label="浏览开发笔记"
              ><SiteIcon name="coffee" :size="29" /><span>Java</span></a
            >
          </div>
        </div>
        <div class="orbit-journey orbit-ai">
          <div class="orbit-counter">
            <a href="/about" class="orbit-badge ai-badge" aria-label="了解我的 AI 应用兴趣"
              ><SiteIcon name="sparkle" :size="25" /><span>AI</span></a
            >
          </div>
        </div>
        <div class="orbit-journey orbit-github">
          <div class="orbit-counter">
            <a
              href="https://github.com/Khaoden"
              target="_blank"
              rel="noopener noreferrer"
              class="orbit-badge github-badge"
              aria-label="访问 Khaoden 的 GitHub"
              ><SiteIcon name="github" :size="29"
            /></a>
          </div>
        </div>
        <div class="orbit-journey orbit-photo">
          <div class="orbit-counter">
            <a href="/about" class="orbit-photo-link" aria-label="认识 Khaoden"
              ><img src="/images/avatar.jpg" alt="" width="98" height="98"
            /></a>
          </div>
        </div>

        <div
          class="identity-card"
          :style="cardStyle"
          @pointermove="moveCard"
          @pointerleave="resetCard"
        >
          <div class="identity-label">
            <span>你好，我是</span><SiteIcon name="asterisk" :size="21" /><img
              class="identity-avatar"
              src="/images/avatar.jpg"
              alt=""
              width="32"
              height="32"
            />
          </div>
          <h1 id="identity-name">Khaoden<span>.</span></h1>
          <p class="identity-description">把所学，写成自己的语言。</p>
          <div class="identity-divider"></div>
          <p class="identity-section-label">我的几个关键词</p>
          <div class="identity-roles">
            <a href="/blog?category=%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0&view=drafts"
              ><span>后端开发</span><small>Backend</small><SiteIcon name="diagonal" :size="18"
            /></a>
            <a href="/about"
              ><span>应用探索</span><small>AI Applications</small
              ><SiteIcon name="diagonal" :size="18"
            /></a>
            <a href="#notes"
              ><span>学习与记录</span><small>Learning</small><SiteIcon name="diagonal" :size="18"
            /></a>
          </div>
          <div class="identity-bottom">
            <a href="#notes" class="identity-read">开始阅读 <SiteIcon name="arrow" :size="16" /></a>
            <a href="/about" class="identity-about"
              >关于我 <SiteIcon name="diagonal" :size="15"
            /></a>
          </div>
          <div class="identity-spark" aria-hidden="true">
            <SiteIcon name="asterisk" :size="68" />
          </div>
        </div>
      </div>
      <a href="#spaces" class="hero-scroll"
        ><span>往下看看我的小世界</span><SiteIcon name="arrow" :size="18"
      /></a>
    </section>

    <section id="spaces" class="spaces-section" aria-labelledby="spaces-heading">
      <div class="home-section-intro">
        <span class="eyebrow">A LITTLE OF EVERYTHING</span>
        <h2 id="spaces-heading">
          代码、文字，<br class="mobile-break" />还有一点好奇心<span>.</span>
        </h2>
        <p>在这里记录后端开发、AI 应用与学习过程中的点滴。</p>
      </div>
      <div class="channel-grid">
        <a href="/blog" class="channel-card channel-notes"
          ><div class="channel-top">
            <SiteIcon name="book" :size="27" /><SiteIcon name="diagonal" :size="21" />
          </div>
          <span class="channel-label">NOTEBOOK</span>
          <h3>我的公开笔记本</h3>
          <p>把理解写下来，也把问题留下来。</p>
          <div class="channel-bottom">
            <strong>{{ readable.length }}<small>篇正文</small></strong
            ><span>另有 {{ unfinished }} 份笔记整理中</span>
          </div></a
        >
        <a
          href="https://github.com/Khaoden"
          target="_blank"
          rel="noopener noreferrer"
          class="channel-card channel-github"
          ><div class="channel-top">
            <SiteIcon name="github" :size="28" /><SiteIcon name="diagonal" :size="21" />
          </div>
          <span class="channel-label">BUILD IN THE OPEN</span>
          <h3>GitHub</h3>
          <p>从一个小想法，到可以运行的代码。</p>
          <div class="channel-bottom">
            <strong class="channel-handle">@Khaoden</strong><span>来看看我的代码</span>
          </div></a
        >
        <a href="/friend" class="channel-card channel-friends"
          ><div class="channel-top">
            <SiteIcon name="link" :size="28" /><SiteIcon name="diagonal" :size="21" />
          </div>
          <span class="channel-label">A SMALL INTERNET</span>
          <h3>去朋友家坐坐</h3>
          <p>一些独立站点，一些不同的视角。</p>
          <div class="channel-bottom">
            <strong class="channel-handle">Hello, world.</strong><span>网上邻居 →</span>
          </div></a
        >
      </div>
    </section>

    <section class="workbench-section" aria-labelledby="workbench-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">LEARNING BY DOING</span>
          <h2 id="workbench-heading">最近在折腾什么</h2>
        </div>
        <a href="/projects" class="text-link">项目与实践 <SiteIcon name="diagonal" :size="16" /></a>
      </div>
      <div class="workbench-grid">
        <a v-if="featured" :href="featured.url" class="featured-article">
          <div class="feature-copy">
            <span class="feature-eyebrow">SELECTED NOTE / JAVA</span>
            <h3>{{ titleOf(featured) }}</h3>
            <p>二分查找、双指针与滑动窗口。<br />从边界出发，把解题思路一步步理清楚。</p>
            <div class="featured-meta">
              <time :datetime="featured.frontmatter.date">{{
                dateLabel(featured.frontmatter.date)
              }}</time
              ><span>打开这篇笔记 <SiteIcon name="arrow" :size="17" /></span>
            </div>
          </div>
          <div class="array-art" aria-hidden="true">
            <span>BINARY SEARCH</span>
            <div class="array-bracket"></div>
            <div class="array-cells"><i>1</i><i>3</i><i>5</i><i>8</i><i>13</i></div>
            <div class="array-labels"><span>left</span><span>mid</span><span>right</span></div>
            <small>把复杂的问题，拆成清楚的步骤。</small>
          </div>
        </a>
        <div class="focus-stack">
          <a v-for="item in focus" :key="item.category" :href="item.href" class="focus-card"
            ><span class="focus-icon"><SiteIcon :name="item.icon" :size="23" /></span>
            <div>
              <h3>
                {{ item.title
                }}<span>{{
                  item.ready ? item.ready + ' 篇正文' : item.pending + ' 份整理中'
                }}</span>
              </h3>
              <p>{{ item.detail }}</p>
            </div>
            <SiteIcon name="diagonal" :size="17"
          /></a>
        </div>
      </div>
    </section>

    <section id="notes" class="home-entries" aria-labelledby="notes-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">NOTES & THOUGHTS</span>
          <h2 id="notes-heading">
            最近写下的<span class="section-count" :aria-label="readable.length + ' 篇正文'">{{
              readable.length
            }}</span>
          </h2>
        </div>
        <a href="/blog" class="text-link">全部文章 <SiteIcon name="arrow" :size="17" /></a>
      </div>
      <div class="category-tabs" aria-label="文章分类">
        <button
          v-for="category in ['全部', ...categories]"
          :key="category"
          type="button"
          :class="{ selected: tab === category }"
          :aria-pressed="tab === category"
          @click="tab = category"
        >
          {{ category }}
        </button>
      </div>
      <PostList v-if="selected.length" :posts="selected" />
      <div v-else class="home-empty-state" role="status">
        <SiteIcon name="book" :size="26" />
        <h3>这个主题的笔记还在整理中。</h3>
        <p>先读读已完成的文字，或者去归档看看整理进度。</p>
        <div>
          <button type="button" class="primary-button" @click="tab = '全部'">阅读其他笔记</button
          ><a :href="'/blog?category=' + encodeURIComponent(tab) + '&view=drafts'" class="text-link"
            >查看整理中的记录 <SiteIcon name="arrow" :size="16"
          /></a>
        </div>
      </div>
      <a href="/blog" class="all-posts-link"
        >浏览全部 {{ readable.length }} 篇正文 <SiteIcon name="arrow" :size="17"
      /></a>
    </section>

    <a href="/about" class="home-closing"
      ><span class="closing-spark" aria-hidden="true"><SiteIcon name="asterisk" :size="48" /></span>
      <div>
        <span class="eyebrow">THIS IS JUST THE BEGINNING</span>
        <h2>代码之外，也想和你聊聊。</h2>
        <p>关于这个博客，和写下这些文字的人。</p>
      </div>
      <SiteIcon name="diagonal" :size="26"
    /></a>
  </div>
</template>
