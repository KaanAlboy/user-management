<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BreadcrumbItem from './BreadcrumbItem.vue'

const route = useRoute()
const breadcrumbList = ref(route.meta.breadcrumbs)

watch(route, () => {
  breadcrumbList.value = route.meta.breadcrumbs
})
</script>

<template>
  <nav>
    <ul class="flex items-center">
      <li>
        <img src="../../assets/HomeIcon.svg" />
      </li>
      <li
        v-for="(breadcrumb, index) in breadcrumbList"
        :key="breadcrumb.name"
        class="flex items-center"
      >
        <BreadcrumbItem
          :to="breadcrumb.link"
          :label="breadcrumb.name"
          :isFirstBreadcrumb="index === 0"
        ></BreadcrumbItem>
      </li>
    </ul>
  </nav>
</template>
