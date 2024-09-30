<script setup lang="ts">
const props = defineProps<{
  actionType: 'create' | 'update'
}>()

const getTitle = () => {
  if (props.actionType === 'create') {
    return 'Create User'
  }

  return 'Edit User'
}

const getDescription = () => {
  if (props.actionType === 'create') {
    return 'Use form to create user'
  }

  return 'Use form to update user information'
}
</script>

<template>
  <div class="flex items-center gap-4">
    <img class="p-2.5 border rounded-[100px] border-slate-300" src="../../assets/Pencil.svg" />
    <div class="flex gap-1 flex-col">
      <div class="text-base leading-5 text-slate-700">{{ getTitle() }}</div>
      <div class="text-sm leading-4 text-slate-400">{{ getDescription() }}</div>
    </div>
  </div>
</template>
