<template>
  <span>{{ displayText }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  delay: {
    type: Number,
    default: 100
  }
})

const displayText = ref('')
const textRef = ref(null)

const typeText = async () => {
  displayText.value = ''
  for (let i = 0; i < props.text.length; i++) {
    displayText.value += props.text[i]
    await new Promise(resolve => setTimeout(resolve, props.delay))
  }
}

onMounted(() => {
  typeText()
})

watch(() => props.text, () => {
  typeText()
})
</script> 