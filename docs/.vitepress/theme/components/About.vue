<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import SiteIcon from './SiteIcon.vue'
import MotionReveal from './MotionReveal.vue'
import { categoryOf, categories } from '../utils/presentation'
const { theme } = useData()
const posts = computed(() => (theme.value.posts || []) as Post[])
const readable = computed(() => posts.value.filter((post) => post.hasContent !== false))
const topics = computed(() =>
  categories.map((name) => ({
    name,
    count: readable.value.filter((post) => categoryOf(post) === name).length,
    href: '/blog?category=' + encodeURIComponent(name)
  }))
)
const questions = [
  {
    title: '第一次来，可以从哪里开始？',
    text: '首页整理了 Java → Spring、算法与动手实践三条阅读路线。想打基础，可以先看类型、对象与集合；想看解题思路，可以从数组和二分查找开始。',
    href: '/#learning-paths',
    link: '挑一条阅读路线'
  },
  {
    title: '代码示例适合什么环境？',
    text: 'Java 基础、面向对象与集合笔记中的完整示例使用 Java 17。Spring 笔记以 Framework 6 为背景，注明了所需依赖。不同版本的默认行为可能变化，使用时也请核对项目版本。',
    href: '/blog/posts/learning/javaSE/java基础',
    link: '从第一个例子开始'
  },
  {
    title: '发现错误，或者想交流怎么办？',
    text: '笔记会随着理解继续修订。如果发现表达不清、代码问题或失效链接，可以到博客仓库提交 Issue，附上对应页面和复现信息。',
    href: 'https://github.com/Khaoden/blog/issues',
    link: '到 GitHub 交流'
  }
]
const interests = [
  {
    icon: 'code',
    title: '后端开发',
    text: '从 Java、Spring 到系统设计，理解原理，也关注实际问题。',
    tags: ['Java', 'Spring', 'MySQL']
  },
  {
    icon: 'sparkle',
    title: 'AI 应用',
    text: '探索大模型与日常开发的连接，把想法变成可以使用的工具。',
    tags: ['Python', 'LangChain', 'RAG']
  },
  {
    icon: 'book',
    title: '学习与记录',
    text: '用自己的语言整理知识，让每一次学习都有迹可循。',
    tags: ['算法', '阅读', '写作']
  }
]
</script>
<template>
  <div class="about-page page-width">
    <header class="page-intro">
      <span class="eyebrow">ABOUT</span>
      <h1>你好，我是 Khaoden<span class="heading-dot">.</span></h1>
      <p>一个喜欢探索，也喜欢把事情想明白的人。</p>
    </header>
    <MotionReveal as="section" class="about-story">
      <div class="about-photo">
        <img src="/images/avatar.jpg" alt="Khaoden 的头像" width="240" height="240" /><span
          class="photo-caption"
          >STAY CURIOUS, ALWAYS.</span
        >
      </div>
      <div class="about-copy">
        <span class="eyebrow">CODE. LEARN. REPEAT.</span>
        <h2>在问题里探索，<br />在文字里整理。</h2>
        <p>
          我是一名关注后端开发与 AI
          应用的开发者。这里是我的公开笔记本，记录从理解概念到动手实践的过程。
        </p>
        <p>
          写作对我来说，是把模糊的想法慢慢变清楚。它未必总是完整的答案，也可以是一个正在生长的问题。
        </p>
        <a
          class="primary-button"
          href="https://github.com/Khaoden"
          target="_blank"
          rel="noopener noreferrer"
          ><SiteIcon name="github" :size="18" /> 我的 GitHub <SiteIcon name="diagonal" :size="17"
        /></a>
      </div>
    </MotionReveal>
    <MotionReveal as="section" class="about-map" aria-labelledby="about-map-heading">
      <div class="about-map-copy">
        <span class="eyebrow">A MAP OF THIS PLACE</span>
        <h2 id="about-map-heading">把零散的问题，<br />慢慢连成一张地图。</h2>
        <p>
          这里既有从类型、对象到 Spring
          的基础线，也有数组、字符串与回溯的解题线。可以按主题读，也可以从眼前的问题出发。
        </p>
        <a href="/#learning-paths" class="text-link"
          >看看阅读路线 <SiteIcon name="arrow" :size="16"
        /></a>
      </div>
      <div class="about-topic-grid">
        <a v-for="(topic, index) in topics" :key="topic.name" :href="topic.href"
          ><span class="topic-index">0{{ index + 1 }}</span
          ><strong>{{ topic.name }}</strong
          ><span>{{ topic.count }} 篇正文 <SiteIcon name="diagonal" :size="15" /></span
        ></a>
      </div>
    </MotionReveal>
    <MotionReveal>
      <div class="section-heading">
        <div>
          <span class="eyebrow">CURRENT INTERESTS</span>
          <h2>我在关注什么<span class="heading-dot">.</span></h2>
        </div>
      </div>
      <div class="interest-grid">
        <section v-for="interest in interests" :key="interest.title" class="interest-card">
          <span class="interest-icon"><SiteIcon :name="interest.icon" :size="24" /></span>
          <h3>{{ interest.title }}</h3>
          <p>{{ interest.text }}</p>
          <div>
            <span v-for="tag in interest.tags" :key="tag">{{ tag }}</span>
          </div>
        </section>
      </div>
    </MotionReveal>
    <MotionReveal as="section" class="about-principles" aria-labelledby="principles-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">HOW THESE NOTES GROW</span>
          <h2 id="principles-heading">一篇笔记怎样长出来</h2>
        </div>
      </div>
      <ol>
        <li>
          <span>01</span>
          <div>
            <h3>先留下一个问题</h3>
            <p>
              为什么引用可以修改对象？为什么 this
              调用没有经过代理？从具体的困惑开始，找到需要解释的边界。
            </p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h3>再把它缩成一个例子</h3>
            <p>
              用尽量小的代码呈现行为，把输入、输出和前提写清楚。理解一个概念，也要知道它在哪里不再成立。
            </p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h3>最后，连回已有的知识</h3>
            <p>给出相邻主题、练习和官方资料。读完一篇之后，能带着更清晰的问题继续走下去。</p>
          </div>
        </li>
      </ol>
    </MotionReveal>
    <MotionReveal as="section" class="about-questions" aria-labelledby="questions-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">A FEW SMALL ANSWERS</span>
          <h2 id="questions-heading">也许你会想问</h2>
        </div>
      </div>
      <details v-for="question in questions" :key="question.title">
        <summary>{{ question.title }}<span aria-hidden="true">+</span></summary>
        <div>
          <p>{{ question.text }}</p>
          <a
            :href="question.href"
            class="text-link"
            :target="question.href.startsWith('https:') ? '_blank' : undefined"
            :rel="question.href.startsWith('https:') ? 'noopener noreferrer' : undefined"
            >{{ question.link }} <SiteIcon name="diagonal" :size="15"
          /></a>
        </div>
      </details>
    </MotionReveal>
    <MotionReveal as="section" class="about-site">
      <div>
        <span class="eyebrow">COLOPHON</span>
        <h2>关于这个博客</h2>
        <p>
          用 VitePress 和 Vue 搭建，用文字慢慢填满。<br />如果这些笔记恰好帮到了你，那就是记录最好的意义。
        </p>
      </div>
      <a
        href="https://github.com/Khaoden/blog"
        class="text-link"
        target="_blank"
        rel="noopener noreferrer"
        >看看博客源码 <SiteIcon name="diagonal" :size="18"
      /></a>
    </MotionReveal>
  </div>
</template>
