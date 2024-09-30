<script setup lang="ts">
const props = defineProps({
  to: { type: String, default: '/' },
  label: String,
  isFirstBreadcrumb: Boolean
})

function getLabelClassString() {
  let classStr = 'text-sm '

  if (props.isFirstBreadcrumb) {
    classStr += 'text-slate-500'
  } else {
    classStr += 'text-slate-800	'
  }

  return classStr
}
</script>

<template>
  <div class="h-4 w-4 text-slate-300 text-center">/</div>
  <RouterLink :to="to"
    ><span :class="getLabelClassString()">{{ label }}</span></RouterLink
  >
</template>
