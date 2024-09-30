<script setup lang="ts">
defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close-modal'])
</script>

<template>
  <div v-if="isOpen" class="z-40 w-full h-full bg-black/[0.12] fixed top-0 left-0">
    <div class="mt-60 mx-auto max-w-[546px] p-5 bg-white rounded-lg">
      <div class="flex justify-between flex-row-reverse items-start mb-4">
        <img
          @click="emit('close-modal')"
          class="hover:cursor-pointer"
          src="../../assets/Cross.svg"
        />
        <slot name="header"></slot>
      </div>

      <slot name="content"></slot>
    </div>
  </div>
</template>
