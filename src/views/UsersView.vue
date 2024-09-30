<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UsersTable from '../components/UsersTable.vue'
import { useUserListStore } from '@/stores/userListStore'
import PageHeader from '@/components/PageHeader.vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import ModalLayout from '@/components/modal/ModalLayout.vue'
import FormModalHeader from '@/components/modal/FormModalHeader.vue'
import DarkButton from '@/components/buttons/DarkButton.vue'

const userListStore = useUserListStore()
const { userList } = storeToRefs(userListStore)
const route = useRoute()
const router = useRouter()
let showFormModal = ref(false)
let showDeleteModal = ref(false)
let userIdForDelete = ref('')
let actionType: 'create' | 'update'

function handleEditButtonClick(userId: string) {
  router.push({ name: 'update-user-modal', params: { id: userId } })

  showFormModal.value = true
  actionType = 'update'
}

function createUser() {
  router.push({ name: 'create-user-modal' })

  showFormModal.value = true
  actionType = 'create'
}

function handleCloseFormModal() {
  router.push({ name: 'home' })

  showFormModal.value = false
}

function handleDeleteButtonClick(userId: string) {
  showDeleteModal.value = true

  userIdForDelete.value = userId
}

function handleDeleteModalApproveButtonClick() {
  userListStore.deleteUser(userIdForDelete.value)

  showDeleteModal.value = false
}

function handleCloseDeleteModal() {
  showDeleteModal.value = false
}

watch(route, (to) => {
  if (to.path === '/') {
    showFormModal.value = false
  }
})
</script>

<template>
  <ModalLayout :is-open="showFormModal" @close-modal="handleCloseFormModal">
    <template v-slot:header>
      <FormModalHeader :actionType="actionType"></FormModalHeader>
    </template>
    <template v-slot:content>
      <RouterView></RouterView>
    </template>
  </ModalLayout>

  <ModalLayout :is-open="showDeleteModal" @close-modal="handleCloseDeleteModal">
    <template v-slot:content>
      <div class="flex flex-col items-center gap-4 text-center">
        Do you want to delete user?
        <DarkButton @click="handleDeleteModalApproveButtonClick">Yes</DarkButton>
      </div>
    </template>
  </ModalLayout>

  <PageHeader buttonText="Create" @click="() => createUser()"></PageHeader>
  <UsersTable
    class="mt-14"
    :user-list="userList"
    @sort-table="(col) => userListStore.sortUserList(col)"
    @edit-button-click="handleEditButtonClick"
    @delete-button-click="handleDeleteButtonClick"
  ></UsersTable>
</template>
