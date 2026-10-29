<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import SiteIcon from './SiteIcon.vue'
import { learningPaths } from '../utils/learningPaths'

const selected = ref(0)
const path = computed(() => learningPaths[selected.value])
const id = useId()
function navigate(event: KeyboardEvent) {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key))
    return
  event.preventDefault()
  const delta = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : -1
  selected.value =
    event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? learningPaths.length - 1
        : (selected.value + delta + learningPaths.length) % learningPaths.length
  const button = (event.currentTarget as HTMLElement).querySelectorAll<HTMLButtonElement>(
    '[role="tab"]'
  )[selected.value]
  button?.focus()
}
</script>

<template>
  <div class="reading-paths">
    <div class="path-tabs" role="tablist" aria-label="选择阅读路线" @keydown="navigate">
      <button
        v-for="(item, index) in learningPaths"
        :id="id + '-tab-' + index"
        :key="item.id"
        role="tab"
        type="button"
        :aria-selected="selected === index"
        :aria-controls="id + '-panel'"
        :tabindex="selected === index ? 0 : -1"
        @click="selected = index"
      >
        <span class="path-tab-icon"><SiteIcon :name="item.icon" :size="22" /></span>
        <span
          ><strong>{{ item.name }}</strong
          ><small>{{ item.caption }}</small></span
        >
        <SiteIcon name="arrow" :size="18" />
      </button>
    </div>
    <div
      :id="id + '-panel'"
      class="path-panel"
      role="tabpanel"
      :aria-labelledby="id + '-tab-' + selected"
      tabindex="0"
    >
      <Transition name="path-swap" mode="out-in">
        <div :key="path.id" class="path-panel-inner">
          <div class="path-panel-heading">
            <span class="eyebrow">READING ROUTE / 0{{ selected + 1 }}</span>
            <p>{{ path.intro }}</p>
          </div>
          <ol class="path-steps">
            <li
              v-for="(step, index) in path.steps"
              :key="step.href"
              :style="{ '--step-order': index }"
            >
              <a :href="step.href"
                ><span class="path-number">0{{ index + 1 }}</span
                ><span
                  ><strong>{{ step.title }}</strong
                  ><small>{{ step.detail }}</small></span
                ><SiteIcon name="diagonal" :size="17"
              /></a>
            </li>
          </ol>
        </div>
      </Transition>
    </div>
  </div>
</template>
