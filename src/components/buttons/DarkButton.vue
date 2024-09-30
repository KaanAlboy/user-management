<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { PropType, ButtonHTMLAttributes } from 'vue'

const props = defineProps({
  routeTo: { type: String },
  disabled: { type: Boolean, default: false },
  type: { type: String as PropType<ButtonHTMLAttributes['type']>, default: 'button' }
})

const router = useRouter()
const emit = defineEmits(['click'])

function handleClick(event: Event) {
  emit('click', event)

  if (props.routeTo) {
    router.push(props.routeTo)
  }
}
</script>

<template>
  <button
    class="px-2.5 py-2 rounded-md bg-slate-800 hover:bg-slate-900 active:bg-slate-950 disabled:bg-slate-50 text-white disabled:text-slate-200"
    :disabled
    :type
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>
