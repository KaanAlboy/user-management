<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbItem from './BreadcrumbItem.vue'

const route = useRoute()
const breadcrumbList = ref(route.meta.breadcrumbs)

watch(route, () => {
  console.log(route.meta)
  breadcrumbList.value = route.meta.breadcrumbs
})
</script>

<template>
  <nav>
    <ul class="flex items-center">
      <li>
        <img src="../../assets/homeIcon.svg" />
      </li>
      <li class="flex items-center">
        <BreadcrumbItem
          v-for="(breadcrumb, index) in breadcrumbList"
          :to="breadcrumb.link"
          :key="breadcrumb.name"
          :label="breadcrumb.name"
          :isFirstBreadcrumb="index === 0"
        ></BreadcrumbItem>
      </li>
    </ul>
  </nav>
</template>
