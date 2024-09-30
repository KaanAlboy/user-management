<script setup lang="ts">
defineProps({
  disabled: Boolean
})
</script>

<template>
  <button
    class="h-8 px-2.5 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 active:bg-slate-100 disabled:bg-white text-slate-800 disabled:text-slate-300"
    :disabled
  >
    <slot></slot>
  </button>
</template>
