<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type user from '@/utilities/UserInterface'
import { useUserListStore } from '@/stores/userListStore'
import FormInput from './FormInput.vue'
import DarkButton from './buttons/DarkButton.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  userId: string
}>()

const router = useRouter()
const userListStore = useUserListStore()
const isValid = {
  name: ref(true),
  email: ref(true),
  age: ref(true)
}
const form = {
  name: ref(''),
  email: ref(''),
  age: ref('')
}

let userToEdit: user | null

onMounted(() => {
  if (props.userId) {
    userToEdit = userListStore.getUserById(props.userId)

    if (userToEdit) {
      form.name.value = userToEdit.name
      form.email.value = userToEdit.email
      form.age.value = userToEdit.age.toString()
    }
  }
})

function validateNameInput() {
  if (!form.name.value) {
    isValid.name.value = false
  } else {
    isValid.name.value = true
  }
}

function validateEmailInput() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!form.email.value || !emailRegex.test(form.email.value)) {
    isValid.email.value = false
  } else {
    isValid.email.value = true
  }
}

function validateAgeInput() {
  const age = parseInt(form.age.value, 10)

  if (!age || age < 0 || !Number.isInteger(age)) {
    isValid.age.value = false
  } else {
    isValid.age.value = true
  }
}

function checkForm() {
  validateNameInput()
  validateEmailInput()
  validateAgeInput()

  if (Object.values(isValid).every((validity) => validity.value)) {
    return true
  }

  return false
}

function goToHomePage() {
  router.push('/')
}

function submitForm(event: Event) {
  event.preventDefault()

  if (checkForm()) {
    if (!props.userId) {
      userListStore.createUser(form.name.value, form.email.value, form.age.value)
    } else {
      userListStore.updateUserInfo(props.userId, form.name.value, form.email.value, form.age.value)
    }

    goToHomePage()
  }
}
</script>

<template>
  <form @submit="(e) => submitForm(e)">
    <FormInput
      class="mb-8"
      label="Name"
      type="text"
      placeholder="Enter Name"
      :isValid="isValid.name.value"
      v-model="form.name.value"
    ></FormInput>
    <FormInput
      class="mb-8"
      label="Email"
      type="text"
      placeholder="Enter Email"
      :isValid="isValid.email.value"
      v-model="form.email.value"
    ></FormInput>
    <FormInput
      class="mb-8"
      label="Age"
      type="number"
      placeholder="Enter Age"
      :isValid="isValid.age.value"
      v-model="form.age.value"
    ></FormInput>
    <div class="flex justify-end">
      <DarkButton type="submit">{{ !userId ? 'Create' : 'Save' }}</DarkButton>
    </div>
  </form>
</template>
