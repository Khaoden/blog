<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { friends } from '../../config/friends'
import SiteIcon from './SiteIcon.vue'
const copied = ref(false)
const failedAvatars = ref<Record<string, boolean>>({})
const copyError = ref(false)
const siteInfo = ref('')
let timer: ReturnType<typeof setTimeout> | undefined
async function copyInfo() {
  siteInfo.value =
    '名称：Khaoden\n简介：后端开发、AI 应用与生活记录。\n地址：' +
    window.location.origin +
    '\n头像：' +
    window.location.origin +
    '/images/avatar.jpg'
  try {
    await navigator.clipboard.writeText(siteInfo.value)
    copied.value = true
    copyError.value = false
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2500)
  } catch {
    copied.value = false
    clearTimeout(timer)
    copyError.value = true
  }
}
onUnmounted(() => clearTimeout(timer))
</script>
<template>
  <div class="friends-page page-width">
    <header class="page-intro">
      <span class="eyebrow"><SiteIcon name="link" :size="16" /> A LITTLE INTERNET</span>
      <h1>山水有相逢，<br />来这里坐坐<span class="heading-dot">.</span></h1>
      <p>让独立的声音彼此连接。这里收藏一些值得停留的个人站点。</p>
    </header>
    <div class="friends-section-heading">
      <h2>
        网上邻居 <span>{{ friends.length }}</span>
      </h2>
      <span>每一个链接，都是一扇窗。</span>
    </div>
    <div class="friends-grid">
      <a
        v-for="(friend, index) in friends"
        :key="friend.link"
        :href="friend.link"
        target="_blank"
        rel="noopener noreferrer"
        class="friend-card"
        ><div class="friend-card-top">
          <span class="friend-avatar" :class="'friend-color-' + index"
            ><img
              v-if="friend.avatar && !failedAvatars[friend.link]"
              :src="friend.avatar"
              :alt="friend.name + ' 的头像'"
              loading="lazy"
              width="64"
              height="64"
              @error="failedAvatars[friend.link] = true"
            /><template v-else>{{
              friend.name
                .replace(/^blog\./, '')
                .charAt(0)
                .toUpperCase()
            }}</template></span
          ><span class="friend-visit"><SiteIcon name="diagonal" :size="20" /></span>
        </div>
        <h3>{{ friend.name }}</h3>
        <p>{{ friend.description }}</p>
        <div class="friend-card-bottom">
          <span v-for="tag in friend.tags" :key="tag">{{ tag }}</span
          ><span class="friend-domain">{{
            friend.link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]
          }}</span>
        </div></a
      >
    </div>
    <section class="friend-invitation">
      <div class="invitation-art" aria-hidden="true">
        <SiteIcon name="link" :size="36" /><span>HELLO,<br />NEIGHBOR.</span><i>✳</i>
      </div>
      <div class="invitation-copy">
        <span class="eyebrow">LET'S GET CONNECTED</span>
        <h2>一起织一张有趣的网。</h2>
        <p>
          如果你也有一个用心记录的博客，欢迎来交换友链。<br />带上站点名称、链接和一句介绍，先认识一下。
        </p>
        <div class="invitation-actions">
          <a
            href="https://github.com/Khaoden/blog/issues/new?title=%E7%94%B3%E8%AF%B7%E4%BA%A4%E6%8D%A2%E5%8F%8B%E9%93%BE"
            target="_blank"
            rel="noopener noreferrer"
            class="primary-button"
            >申请交换友链 <SiteIcon name="diagonal" :size="17" /></a
          ><button type="button" class="quiet-button" @click="copyInfo">
            <SiteIcon :name="copied ? 'check' : 'copy'" :size="17" />{{
              copied ? '已复制本站信息' : '复制本站信息'
            }}
          </button>
        </div>
        <p v-if="copyError" class="copy-fallback" role="status">
          暂时无法自动复制，可以手动复制：<textarea
            :value="siteInfo"
            readonly
            aria-label="本站友链信息"
            rows="4"
          ></textarea>
        </p>
        <span v-if="copied" class="sr-only" role="status">本站友链信息已复制到剪贴板</span>
      </div>
    </section>
    <p class="friends-note"><SiteIcon name="leaf" :size="16" /> 相识不必喧哗，常来便是朋友。</p>
  </div>
</template>
