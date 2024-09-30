import { ref } from 'vue'
import { defineStore } from 'pinia'
import type user from '@/utilities/UserInterface'

type colType = 'name' | 'email' | 'age' | ''

export const useUserListStore = defineStore('userList', () => {
  const userList = ref([] as user[])
  let lastSortedCol: colType

  async function fetchUserList() {
    await fetch(`https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/user`, {
      method: 'GET'
    })
      .then(async (res) => await res.json())
      .then((res) => {
        userList.value = res
      })
  }

  function sortUserList(col: colType) {
    if (!userList.value || !userList.value.length || !col) return

    if (col === 'age') {
      userList.value?.sort((a, b) => {
        if (lastSortedCol === col) {
          return b.age - a.age
        }
        return a.age - b.age
      })
    } else {
      userList.value?.sort((a, b) => {
        if (lastSortedCol === col) {
          return b[col].localeCompare(a[col])
        }
        return a[col].localeCompare(b[col])
      })
    }

    if (lastSortedCol === col) {
      lastSortedCol = ''
    } else {
      lastSortedCol = col
    }
  }

  async function createUser(name: string, email: string, age: string) {
    const body = {
      name,
      email,
      age: parseInt(age, 10)
    }

    await fetch(`https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/user`, {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(() => {
        //  Used user input to add user because mockapi io doesn't really create a new user!
        const id = Math.max(...userList.value.map((user) => parseInt(user.id, 10))) + 1

        userList.value = [...userList.value, { id: id.toString(), ...body }]
      })
  }

  async function deleteUser(userId: string) {
    const userToDelete = userList.value.find((user) => user.id === userId)

    if (!userToDelete) return

    await fetch(`https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/user/${userId}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(() => {
        userList.value.splice(userList.value.indexOf(userToDelete), 1)
      })
  }

  function getUserById(userId: string) {
    return userList.value.find((user) => user.id === userId) || null
  }

  async function updateUserInfo(userId: string, name: string, email: string, age: string) {
    const body = {
      name,
      email,
      age: parseInt(age, 10)
    }

    await fetch(`https://${import.meta.env.VITE_MOCKAPI_SECRET}.mockapi.io/api/user/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(() => {
        //  Used user input to update user because mockapi io doesn't really update the user!
        const updatedUser = userList.value.find((user) => user.id === userId)

        if (updatedUser) {
          userList.value.splice(userList.value.indexOf(updatedUser), 1)
          userList.value = [...userList.value, { id: updatedUser.id, ...body }]
        }
      })
  }

  return {
    userList,
    fetchUserList,
    createUser,
    sortUserList,
    deleteUser,
    getUserById,
    updateUserInfo
  }
})
