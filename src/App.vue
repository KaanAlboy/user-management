<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useUserListStore } from './stores/userListStore'
import { onMounted, ref } from 'vue'

const isAppLoading = ref(true)
const userListStore = useUserListStore()

onMounted(async () => {
  await userListStore.fetchUserList()

  isAppLoading.value = false
})
</script>

<template>
  <RouterView v-if="!isAppLoading" />
</template>
