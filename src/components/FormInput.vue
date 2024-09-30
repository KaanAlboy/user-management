<script setup lang="ts">
defineProps({
  type: String,
  disabled: Boolean,
  label: String,
  placeholder: String,
  isValid: { type: Boolean, default: true }
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1 text-slate-800">
    <div class="flex gap-1">
      <label :for="label">{{ label }}</label
      ><img v-if="!disabled" src="../assets/InfoIcon.svg" />
    </div>

    <input
      class="h-8 border border-slate-300 rounded indent-2.5 disabled:placeholder:text-slate-300 disabled:bg-slate-50 focus:outline-none"
      :class="isValid ? '' : '!border-red-600'"
      :id="label"
      :type
      :disabled
      :placeholder
      v-model="model"
      @invalid.prevent
    />
  </div>
</template>
