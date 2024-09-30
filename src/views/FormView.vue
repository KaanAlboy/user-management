<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
import { useRoute } from 'vue-router'
import UserForm from '@/components/UserForm.vue'

const route = useRoute()
const openedInModal = route.meta.showInModal
const userIdToUpdate = route.params.id?.toString()
</script>

<template>
  <div class="">
    <div class="mx-auto max-w-[846px]">
      <PageHeader v-if="!openedInModal" class="mb-7" routeTo="/" buttonText="Back"></PageHeader>
      <div class="mx-7" :class="openedInModal ? '!m-0' : ''">
        <UserForm :userId="userIdToUpdate"></UserForm>
      </div>
    </div>
  </div>
</template>
