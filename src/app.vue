<script setup lang="ts">
useHead({
  title: 'Clone VK',
});
</script>

<template>
  <NuxtLoadingIndicator :duration="50000" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
