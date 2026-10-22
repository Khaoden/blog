<script setup lang="ts">
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import PostList from './PostList.vue'
import ProfileCard from './ProfileCard.vue'
import SiteIcon from './SiteIcon.vue'
import { categories, categoryOf } from '../utils/presentation'
const { theme } = useData()
const tab = ref('全部')
const posts = computed(() => (theme.value.posts || []) as Post[])
const selected = computed(() => {
  const source =
    tab.value === '全部'
      ? posts.value.filter(
          (post) =>
            post.frontmatter.date &&
            new Date(post.frontmatter.date).getFullYear() <= new Date().getFullYear()
        )
      : posts.value.filter((post) => categoryOf(post) === tab.value)
  return source.slice(0, 4)
})
</script>
<template>
  <div class="home-page page-width">
    <section class="home-hero">
      <div class="hero-copy">
        <span class="eyebrow"><span class="tiny-dot"></span> KHAODEN'S JOURNAL</span>
        <h1>写代码，<br /><em>也写生活。</em><span class="hero-period">▰</span></h1>
        <p class="hero-intro">你好，我是 <strong>Khaoden</strong>。</p>
        <p class="hero-description">
          记录后端开发、AI 应用与日常灵感。<br
            class="desktop-break"
          />在不断学习的路上，留下一些清晰的思考。
        </p>
        <div class="hero-actions">
          <a href="/blog" class="primary-button"
            >翻开我的笔记 <SiteIcon name="arrow" :size="18" /></a
          ><a href="/about" class="quiet-button"
            >认识一下 <SiteIcon name="diagonal" :size="17"
          /></a>
        </div>
        <div class="hero-smallprint">
          <span class="handwritten">保持好奇，慢慢生长。</span
          ><svg width="56" height="22" viewBox="0 0 56 22" fill="none" aria-hidden="true">
            <path
              d="M2 9c17-10 32-8 48 7m-12-1 13 2-4-12"
              stroke="currentColor"
              stroke-width="1.3"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="art-topline">
          <span>FIELD NOTES / 001</span><SiteIcon name="sparkle" :size="19" />
        </div>
        <div class="art-title">STAY<br /><span>CURIOUS.</span></div>
        <svg class="garden-illustration" viewBox="0 0 480 350" fill="none">
          <defs>
            <linearGradient
              id="hill-shade"
              x1="220"
              y1="120"
              x2="200"
              y2="350"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#8fa78d" />
              <stop offset="1" stop-color="#4d7257" />
            </linearGradient>
            <pattern id="garden-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0v32" stroke="#e6ebd3" stroke-opacity=".09" />
            </pattern>
          </defs>
          <path fill="url(#garden-grid)" d="M0 0h480v350H0z" />
          <circle cx="348" cy="103" r="47" fill="#eacb8c" />
          <circle cx="348" cy="103" r="60" stroke="#eacb8c" stroke-opacity=".3" />
          <path d="M-20 310 159 116l165 194H-20Z" fill="url(#hill-shade)" />
          <path d="m125 310 177-147 197 147H125Z" fill="#73917b" />
          <path d="M-20 350v-87c94-18 160-4 242 25 78 29 165 32 278-6v68H-20Z" fill="#b7c7a4" />
          <path d="M-20 350v-26c106-49 203-25 267-1 69 26 147 16 253-10v37H-20Z" fill="#dfdfbc" />
          <path
            d="M-10 280c107-20 167 2 250 30 74 25 150 17 248-11M-10 291c106-20 166 2 249 30 74 25 150 17 248-11M-10 302c106-20 166 2 249 30 74 25 150 17 248-11"
            stroke="#315940"
            stroke-opacity=".3"
          />
          <path
            d="m159 117-12 193m12-193 21 193m-21-193 59 193m-59-193 97 193m-97-193-49 193m49-193-88 193m88-193-124 193"
            stroke="#e2e8cc"
            stroke-opacity=".18"
          />
          <path
            d="M370 271V172m0 64-20-23m20 7 22-25m-22 7-16-16"
            stroke="#dfe6cc"
            stroke-width="2"
            stroke-linecap="round"
          />
          <path
            d="M94 288v-81m0 58-20-23m20 9 17-18m-17-6-12-13"
            stroke="#dfe6cc"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="94" cy="207" r="4" fill="#dfe6cc" />
          <circle cx="370" cy="172" r="4" fill="#dfe6cc" />
          <path d="m314 51 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#dfdfbc" />
        </svg>
        <div class="art-bottomline"><span>一点思考，一点生长。</span><span>↗</span></div>
        <span class="art-sticker"><SiteIcon name="leaf" :size="18" /> KEEP GROWING</span>
      </div>
    </section>

    <div class="home-divider">
      <span><span class="tiny-dot"></span> 一个持续更新的个人笔记本</span
      ><span>{{ posts.length }} 篇记录 · {{ categories.length }} 个主题</span>
    </div>
    <div class="home-columns">
      <section class="home-entries">
        <div class="section-heading">
          <div>
            <span class="eyebrow">NOTES & THOUGHTS</span>
            <h2>笔记与思考<span class="heading-dot">.</span></h2>
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
        <PostList :posts="selected" />
        <a href="/blog" class="all-posts-link"
          >还有更多文字，等你慢慢翻阅 <SiteIcon name="arrow" :size="18"
        /></a>
        <a href="/blog/posts/interview/代码随想录/数组算法" class="featured-note"
          ><span class="featured-symbol"><SiteIcon name="code" :size="29" /></span>
          <div>
            <span class="eyebrow">BACK TO BASICS</span>
            <h3>把思路，变成代码。</h3>
            <p>从二分查找出发，梳理数组问题中的边界与思考。</p>
          </div>
          <SiteIcon name="diagonal" :size="22"
        /></a>
      </section>
      <ProfileCard />
    </div>
  </div>
</template>
