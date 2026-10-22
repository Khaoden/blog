<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import PostList from './PostList.vue'
import SiteIcon from './SiteIcon.vue'
import { categories, categoryOf, dateLabel, titleOf } from '../utils/presentation'

const { theme } = useData()
const tab = ref('全部')
const posts = computed(() => (theme.value.posts || []) as Post[])
const featured = computed(() =>
  posts.value.find((post) => post.url.endsWith('/代码随想录/数组算法'))
)
const selected = computed(() => {
  const source =
    tab.value === '全部'
      ? posts.value.filter(
          (post) =>
            post.hasContent !== false &&
            Date.parse(post.frontmatter.date) <= Date.now() &&
            post.url !== featured.value?.url
        )
      : posts.value.filter((post) => categoryOf(post) === tab.value)
  return source.slice(0, 4)
})
</script>

<template>
  <div class="home-page page-width">
    <section class="home-intro">
      <div class="intro-copy">
        <span class="eyebrow">一个人的互联网角落</span>
        <h1>
          你好，我是 <em>Khaoden<span>.</span></em>
        </h1>
        <p>
          一名关注后端开发与 AI 应用的开发者。<br />在这里记录学习、实践，以及偶尔冒出来的想法。
        </p>
        <a href="/about" class="intro-link">更多关于我 <SiteIcon name="arrow" :size="16" /></a>
      </div>
      <div class="intro-avatar">
        <img src="/images/avatar.jpg" alt="Khaoden 的头像" width="96" height="96" />
        <span aria-hidden="true"
          ><svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          >
            <path d="M16 2v28M2 16h28M6 6l20 20M6 26 26 6" /></svg
        ></span>
      </div>
    </section>

    <section v-if="featured" class="featured-section" aria-labelledby="featured-heading">
      <div class="section-heading">
        <h2 id="featured-heading">从这篇开始</h2>
        <span class="section-caption">SELECTED NOTE</span>
      </div>
      <a :href="featured.url" class="featured-article">
        <div class="featured-copy">
          <span class="feature-category">{{ categoryOf(featured) }} <span> / </span> Java</span>
          <h3>{{ titleOf(featured) }}</h3>
          <p>二分查找、双指针与滑动窗口。<br />从边界出发，把解题思路一步步理清楚。</p>
          <div class="featured-meta">
            <time :datetime="featured.frontmatter.date">{{
              dateLabel(featured.frontmatter.date)
            }}</time
            ><span>阅读笔记 <SiteIcon name="arrow" :size="17" /></span>
          </div>
        </div>
        <div class="algorithm-art" aria-hidden="true">
          <svg viewBox="0 0 340 228" fill="none">
            <path
              d="M0 38h340M0 76h340M0 114h340M0 152h340M0 190h340M34 0v228M68 0v228M102 0v228M136 0v228M170 0v228M204 0v228M238 0v228M272 0v228M306 0v228"
              stroke="currentColor"
              stroke-opacity=".07"
            />
            <text
              x="26"
              y="32"
              fill="#a9adc2"
              font-size="10"
              font-family="monospace"
              letter-spacing="2"
            >
              01 / BINARY SEARCH
            </text>
            <path d="M52 82V67h222v15M151 155v20h123v-20" stroke="#767f9d" stroke-width="1.3" />
            <path d="m160 62 3 5-3 5m46 98-3 5 3 5" stroke="#767f9d" stroke-width="1.3" />
            <rect x="27" y="94" width="39" height="45" rx="7" fill="#232632" stroke="#3c4050" />
            <rect x="76" y="94" width="39" height="45" rx="7" fill="#232632" stroke="#3c4050" />
            <rect x="125" y="94" width="39" height="45" rx="7" fill="#232632" stroke="#3c4050" />
            <rect x="174" y="94" width="39" height="45" rx="7" fill="#6478f6" />
            <rect x="223" y="94" width="39" height="45" rx="7" fill="#232632" stroke="#3c4050" />
            <rect x="272" y="94" width="39" height="45" rx="7" fill="#232632" stroke="#3c4050" />
            <g fill="#e6e8f0" font-size="18" font-family="monospace" text-anchor="middle">
              <text x="46" y="123">1</text>
              <text x="95" y="123">2</text>
              <text x="144" y="123">3</text>
              <text x="193" y="123">5</text>
              <text x="242" y="123">8</text>
              <text x="291" y="123">13</text>
            </g>
            <path d="m193 85-4-5h8l-4 5Z" fill="#91a0ff" />
            <text x="26" y="207" fill="#a9adc2" font-size="10" font-family="monospace">
              while (left &lt; right)
            </text>
            <text
              x="310"
              y="207"
              fill="#91a0ff"
              font-size="11"
              font-family="monospace"
              text-anchor="end"
            >
              O(log n)
            </text>
          </svg>
        </div>
      </a>
    </section>

    <section class="home-entries" aria-labelledby="notes-heading">
      <div class="section-heading">
        <h2 id="notes-heading">
          笔记与思考 <span class="section-count">{{ posts.length }}</span>
        </h2>
        <a href="/blog" class="text-link">全部文章 <SiteIcon name="arrow" :size="16" /></a>
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
      <PostList :posts="selected" />
      <a href="/blog" class="all-posts-link"
        >浏览全部 {{ posts.length }} 篇记录 <SiteIcon name="arrow" :size="16"
      /></a>
    </section>

    <div class="home-explore">
      <a href="/friend"
        ><SiteIcon name="link" :size="22" />
        <div>
          <h2>网上邻居</h2>
          <p>逛逛那些有趣的独立博客。</p>
        </div>
        <SiteIcon name="diagonal" :size="18"
      /></a>
      <a href="/projects"
        ><SiteIcon name="code" :size="22" />
        <div>
          <h2>边学边做</h2>
          <p>把想法写进代码里。</p>
        </div>
        <SiteIcon name="diagonal" :size="18"
      /></a>
    </div>
  </div>
</template>
