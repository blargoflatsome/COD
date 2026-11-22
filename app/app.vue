<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const SITE = 'Catacombs of Despair'

// Each page sets its own title; this adds the site name after it
useHead({
  titleTemplate: title => (title && title !== SITE ? `${title} · ${SITE}` : SITE)
})
useSeoMeta({
  ogSiteName: SITE,
  ogTitle: () => SITE
})
</script>
