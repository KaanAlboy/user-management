<script setup lang="ts">
import AppBreadcrumbs from './breadcrumbs/AppBreadcrumbs.vue'
import DarkButton from './buttons/DarkButton.vue'

defineProps<{
  routeTo?: string
  buttonText: string
}>()

const emit = defineEmits(['click'])

function handleButtonClick(event: Event) {
  emit('click', event)
}
</script>

<template>
  <header
    class="flex flex-wrap justify-between items-center w-full px-8 py-6 sticky top-0 bg-white"
  >
    <nav>
      <AppBreadcrumbs></AppBreadcrumbs>
    </nav>
    <DarkButton :routeTo @click="handleButtonClick">{{ buttonText }}</DarkButton>
  </header>
</template>
