<script setup lang="ts">
import '@/assets/styles/main.css';

useHead({
  htmlAttrs: {
    lang: 'ru',
  },
  meta: [
    {
      charset: 'utf-8',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
  ],
  title: 'Clone VK',
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
