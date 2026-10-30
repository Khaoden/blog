<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import SiteIcon from './SiteIcon.vue'
import MotionReveal from './MotionReveal.vue'
import { originalNotes } from '../utils/notebook'
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
    title: 'Windows 和 Cursor 的笔记在哪里？',
    text: '放在工具与效率分类。首页目录里的 Windows / Cursor 可以直接打开原来的终端启动笔记，旁边还有 PATH 和 PowerShell 的补充记录。',
    href: '/blog/posts/technology/os/Windows终端命令快捷进入cursor',
    link: '打开 Windows 笔记'
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
    title: 'Java 与 Spring',
    text: '基本类型、集合、对象关系，以及 IoC 和代理调用。',
    tags: ['Java', '集合', 'Spring']
  },
  {
    icon: 'book',
    title: '算法练习',
    text: '代码随想录的刷题笔记，保留原来的分析和代码。',
    tags: ['数组', '字符串', '回溯']
  },
  {
    icon: 'terminal',
    title: 'Windows 与工具',
    text: '终端命令、Cursor 启动、环境变量和 Git。',
    tags: ['Windows', 'PowerShell', 'Git']
  }
]
</script>
<template>
  <div class="about-page page-width">
    <header class="page-intro">
      <span class="eyebrow">ABOUT</span>
      <h1>你好，我是 Khaoden<span class="heading-dot">.</span></h1>
      <p>这里放技术笔记，也放一些工具使用记录。</p>
    </header>
    <MotionReveal as="section" class="about-story">
      <div class="about-photo">
        <img src="/images/avatar.jpg" alt="Khaoden 的头像" width="240" height="240" /><span
          class="photo-caption"
          >KHAODEN / BLOG</span
        >
      </div>
      <div class="about-copy">
        <span class="eyebrow">CODE. LEARN. REPEAT.</span>
        <h2>笔记按主题放，<br />需要时回来查。</h2>
        <p>
          这里主要是 Java、Spring 和算法笔记。Windows 下的终端命令、Cursor
          等工具用法单独放在工具分类。
        </p>
        <p>
          代码随想录的几篇比较长，直接看目录或搜索具体题目更方便。「滑动窗口」「N皇后」这样的正文关键词，也能搜到对应的笔记。
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
        <h2 id="about-map-heading">按主题看，<br />或直接搜一个关键词。</h2>
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
          <h2>这里记录什么<span class="heading-dot">.</span></h2>
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
    <MotionReveal as="section" class="about-originals" aria-labelledby="original-notes-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">EARLIER NOTES</span>
          <h2 id="original-notes-heading">以前的几份笔记</h2>
        </div>
      </div>
      <div class="original-note-links">
        <a v-for="note in originalNotes" :key="note.url" :href="note.url"
          ><SiteIcon
            :name="note.title.startsWith('Windows') ? 'terminal' : 'book'"
            :size="18" /><span>{{ note.title }}</span
          ><SiteIcon name="arrow" :size="16"
        /></a>
      </div>
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
        <p>文章用 Markdown 保存，由 VitePress 和 Vue 显示。<br />源码和修改记录都在 GitHub。</p>
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
