<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import type { Post } from '../../types/blog'
import PostList from './PostList.vue'
import SiteIcon from './SiteIcon.vue'
import MotionReveal from './MotionReveal.vue'
import ReadingPaths from './ReadingPaths.vue'
import AlgorithmLab from './AlgorithmLab.vue'
import NotebookIndex from './NotebookIndex.vue'
import { recentNotes } from '../utils/notebook'
import { categories, categoryOf, dateLabel, titleOf } from '../utils/presentation'

const props = withDefaults(defineProps<{ motionPaused?: boolean }>(), { motionPaused: false })
const { theme } = useData()
const tab = ref('全部')
const visibleCount = ref(6)
watch(tab, () => {
  visibleCount.value = 6
})
const tilt = ref({ x: 0, y: 0 })
const posts = computed(() => (theme.value.posts || []) as Post[])
const readable = computed(() => posts.value.filter((post) => post.hasContent !== false))
const unfinished = computed(() => posts.value.length - readable.value.length)
const featured = computed(() =>
  posts.value.find((post) => post.url.endsWith('/代码随想录/数组算法'))
)
const matchingNotes = computed(() => recentNotes(posts.value, tab.value, categoryOf))
const selected = computed(() => matchingNotes.value.slice(0, visibleCount.value))
const focus = computed(() =>
  [
    {
      title: 'Java / Spring',
      category: '开发笔记',
      icon: 'layers',
      detail: '类型、集合、IoC 和 AOP。'
    },
    {
      title: '算法练习',
      category: '算法与面试',
      icon: 'code',
      detail: '数组、字符串、栈和队列、回溯。'
    },
    {
      title: 'Windows / Git',
      category: '工具与效率',
      icon: 'terminal',
      detail: '终端命令、PATH 和 Git 操作。'
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
  '--tilt-y': (props.motionPaused ? 0 : tilt.value.y) + 'deg',
  '--card-x': 50 + tilt.value.y * 10 + '%',
  '--card-y': 50 - tilt.value.x * 10 + '%'
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
      <div class="hero-atmosphere" aria-hidden="true"><i></i><i></i></div>
      <div class="hero-caption">
        <span class="eyebrow">KHAODEN / NOTES</span><span>Java · 算法 · Windows · 工具</span>
      </div>
      <div class="orbit-universe">
        <div class="orbit-track track-inner" aria-hidden="true"></div>
        <div class="orbit-track track-outer" aria-hidden="true"></div>
        <div class="orbit-journey orbit-java">
          <div class="orbit-counter">
            <a
              href="/blog?category=%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0"
              class="orbit-badge java-badge"
              aria-label="浏览开发笔记"
              ><SiteIcon name="coffee" :size="29" /><span>Java</span></a
            >
          </div>
        </div>
        <div class="orbit-journey orbit-ai">
          <div class="orbit-counter">
            <a
              href="/blog?category=%E5%B7%A5%E5%85%B7%E4%B8%8E%E6%95%88%E7%8E%87"
              class="orbit-badge ai-badge"
              aria-label="查看工具笔记"
              ><SiteIcon name="terminal" :size="25" /><span>工具</span></a
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

        <div class="identity-stage">
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
            <p class="identity-description">Java、算法和工具使用记录。</p>
            <div class="identity-divider"></div>
            <p class="identity-section-label">这里写些什么</p>
            <div class="identity-roles">
              <a href="/blog?category=%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0"
                ><span>后端开发</span><small>Backend</small><SiteIcon name="diagonal" :size="18"
              /></a>
              <a href="/blog?category=%E7%AE%97%E6%B3%95%E4%B8%8E%E9%9D%A2%E8%AF%95"
                ><span>算法练习</span><small>Algorithms</small><SiteIcon name="diagonal" :size="18"
              /></a>
              <a href="/blog?category=%E5%B7%A5%E5%85%B7%E4%B8%8E%E6%95%88%E7%8E%87"
                ><span>工具笔记</span><small>Windows / Git</small
                ><SiteIcon name="diagonal" :size="18"
              /></a>
            </div>
            <div class="identity-bottom">
              <a href="/#notes" class="identity-read"
                >打开笔记目录 <SiteIcon name="arrow" :size="16"
              /></a>
              <a href="/about" class="identity-about"
                >关于我 <SiteIcon name="diagonal" :size="15"
              /></a>
            </div>
            <div class="identity-spark" aria-hidden="true">
              <SiteIcon name="asterisk" :size="68" />
            </div>
          </div>
        </div>
      </div>
      <div class="hero-fragment fragment-code" aria-hidden="true">
        <span class="fragment-kicker">WINDOWS / TERMINAL</span>
        <code><span>PS&gt;</span> Get-Location<br /><span>PS&gt;</span> cursor .</code>
      </div>
      <a href="/#learning-paths" class="hero-fragment fragment-route"
        ><span class="fragment-star"><SiteIcon name="asterisk" :size="24" /></span
        ><span class="fragment-kicker">FOLLOW THE THREAD</span
        ><strong>Windows、算法，<br />旧笔记都在目录里。</strong
        ><span class="fragment-link">找一条阅读路线 <SiteIcon name="arrow" :size="14" /></span
      ></a>
      <a href="/#spaces" class="hero-scroll"
        ><span>往下看看我的小世界</span><SiteIcon name="arrow" :size="18"
      /></a>
    </section>

    <section id="notes" class="home-notebook" aria-labelledby="notebook-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">NOTEBOOK</span>
          <h2 id="notebook-heading">
            笔记目录<span class="section-count">{{ posts.length }}</span>
          </h2>
        </div>
        <a href="/blog" class="text-link">搜索全部笔记 <SiteIcon name="search" :size="16" /></a>
      </div>
      <p class="notebook-description">
        按主题找文章。分组可以收起，原来的 Windows 和算法笔记放在前面。
      </p>
      <NotebookIndex :posts="posts" />
    </section>

    <MotionReveal as="section" id="spaces" class="spaces-section" aria-labelledby="spaces-heading">
      <div class="home-section-intro">
        <span class="eyebrow">A LITTLE OF EVERYTHING</span>
        <h2 id="spaces-heading">
          这个博客里，<br class="mobile-break" />还有这些入口<span>.</span>
        </h2>
        <p>文章归档、代码仓库和朋友们的博客。</p>
      </div>
      <div class="channel-grid">
        <a href="/blog" class="channel-card channel-notes"
          ><div class="channel-top">
            <SiteIcon name="book" :size="27" /><SiteIcon name="diagonal" :size="21" />
          </div>
          <span class="channel-label">NOTEBOOK</span>
          <h3>笔记与文章</h3>
          <p>按分类查找，也可以搜索正文中的关键词。</p>
          <div class="channel-bottom">
            <strong>{{ readable.length }}<small>篇正文</small></strong
            ><span>{{
              unfinished ? '另有 ' + unfinished + ' 份笔记整理中' : 'Java、算法、Windows 与工具'
            }}</span>
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
          <p>博客源码和其他代码记录。</p>
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
          <p>收藏在友链里的独立博客。</p>
          <div class="channel-bottom">
            <strong class="channel-handle">Hello, world.</strong><span>网上邻居 →</span>
          </div></a
        >
      </div>
    </MotionReveal>

    <MotionReveal
      as="section"
      id="learning-paths"
      class="home-paths"
      aria-labelledby="paths-heading"
    >
      <div class="section-heading">
        <div>
          <span class="eyebrow">ONE THING LEADS TO ANOTHER</span>
          <h2 id="paths-heading">不知道从哪篇开始？</h2>
        </div>
        <span class="section-aside">按顺序读，也可以直接跳到需要的部分。</span>
      </div>
      <ReadingPaths />
    </MotionReveal>

    <MotionReveal as="section" class="workbench-section" aria-labelledby="workbench-heading">
      <div class="section-heading">
        <div>
          <span class="eyebrow">LEARNING BY DOING</span>
          <h2 id="workbench-heading">几份比较长的笔记</h2>
        </div>
        <a href="/projects" class="text-link">项目与实践 <SiteIcon name="diagonal" :size="16" /></a>
      </div>
      <div class="workbench-grid">
        <a v-if="featured" :href="featured.url" class="featured-article">
          <div class="feature-copy">
            <span class="feature-eyebrow">SELECTED NOTE / JAVA</span>
            <h3>{{ titleOf(featured) }}</h3>
            <p>两种二分区间写法，以及双指针、滑动窗口的题目和代码。</p>
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
            <small>left、mid、right 对应闭区间的三个位置。</small>
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
    </MotionReveal>

    <MotionReveal as="section" class="home-lab" aria-labelledby="lab-heading">
      <div class="lab-introduction">
        <span class="eyebrow">LESS ABSTRACT, MORE HANDS-ON</span
        ><span class="lab-doodle" aria-hidden="true"><SiteIcon name="code" :size="46" /></span>
        <h2 id="lab-heading">二分查找，<br />走一遍<span>.</span></h2>
        <p>二分查找为什么快？<br />换一个目标，亲手推进几步，<br />看见每次比较留下的范围。</p>
        <a href="/blog/posts/interview/代码随想录/数组算法" class="text-link"
          >回到数组笔记 <SiteIcon name="diagonal" :size="16"
        /></a>
      </div>
      <AlgorithmLab />
    </MotionReveal>

    <MotionReveal
      as="section"
      id="recent-notes"
      class="home-entries"
      aria-labelledby="notes-heading"
    >
      <div class="section-heading">
        <div>
          <span class="eyebrow">NOTES & THOUGHTS</span>
          <h2 id="notes-heading">
            最近补充的笔记<span class="section-count" :aria-label="posts.length + ' 篇笔记'">{{
              posts.length
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
        <h3>这个分类还没有笔记。</h3>
        <p>可以切回全部，或在上方目录里按主题找。</p>
        <div>
          <button type="button" class="primary-button" @click="tab = '全部'">阅读其他笔记</button
          ><a href="/blog" class="text-link">打开全部笔记 <SiteIcon name="arrow" :size="16" /></a>
        </div>
      </div>
      <div class="home-load-more" v-if="selected.length">
        <span role="status">显示 {{ selected.length }} / {{ matchingNotes.length }} 篇</span
        ><button
          v-if="selected.length < matchingNotes.length"
          type="button"
          class="quiet-button"
          @click="visibleCount += 6"
        >
          再看 {{ Math.min(6, matchingNotes.length - selected.length) }} 篇
          <SiteIcon name="down" :size="15" />
        </button>
      </div>
      <a href="/blog" class="all-posts-link"
        >浏览全部 {{ readable.length }} 篇正文 <SiteIcon name="arrow" :size="17"
      /></a>
    </MotionReveal>

    <MotionReveal
      ><a href="/about" class="home-closing"
        ><span class="closing-spark" aria-hidden="true"
          ><SiteIcon name="asterisk" :size="48"
        /></span>
        <div>
          <span class="eyebrow">THIS IS JUST THE BEGINNING</span>
          <h2>关于这个博客</h2>
          <p>栏目说明、示例环境和 GitHub 入口。</p>
        </div>
        <SiteIcon name="diagonal" :size="26" /></a
    ></MotionReveal>
  </div>
</template>
