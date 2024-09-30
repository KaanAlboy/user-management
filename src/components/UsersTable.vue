<script setup lang="ts">
import type user from '@/utilities/UserInterface'
import TableButton from './buttons/TableButton.vue'

defineProps<{
  userList: Array<user>
}>()

const emit = defineEmits(['sort-table', 'edit-button-click', 'delete-button-click'])
</script>

<template>
  <div class="px-8 w-full overflow-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th
            class="px-4 py-3 text-left bg-slate-100 text-slate-500 font-normal border-solid rounded-tl-md hover:cursor-pointer"
            @click="emit('sort-table', 'name')"
          >
            Name
          </th>
          <th
            class="px-4 py-3 text-left bg-slate-100 text-slate-500 font-normal hover:cursor-pointer"
            @click="emit('sort-table', 'email')"
          >
            Email
          </th>
          <th
            class="px-4 py-3 text-left bg-slate-100 text-slate-500 font-normal hover:cursor-pointer"
            @click="emit('sort-table', 'age')"
          >
            Age
          </th>
          <th
            class="px-4 py-3 text-right bg-slate-100 text-slate-500 font-normal border-solid rounded-tr-md hover:cursor-pointer"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.id.toString" class="">
          <td class="px-4 py-3 text-[#4F5659] font-normal">{{ user.name }}</td>
          <td class="px-4 py-3 text-[#4F5659] font-normal flex items-center gap-2.5">
            <div class="w-2.5 h-1.5 bg-[#F43F5E] rounded-[5px]"></div>
            {{ user.email }}
          </td>
          <td class="px-4 py-3 text-[#4F5659] font-normal">{{ user.age }}</td>
          <td class="">
            <div class="flex justify-end gap-2.5 mx-4 my-1">
              <TableButton @click="emit('edit-button-click', user.id)">Edit</TableButton
              ><TableButton @click="emit('delete-button-click', user.id)">Delete</TableButton>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
