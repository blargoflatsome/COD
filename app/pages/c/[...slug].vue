<template>
  <UPage v-if="page">
    <UPageHeader v-if="page.title" :title="page.title" class="p-0" />

    <UPageBody class="m-0 pe-2">
      <ContentRenderer v-if="page.body" :value="page" class="markdown" />
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc :links="page.body.toc.links" title="Table of Contents" class="fixed right-2.5" />
    </template>
  </UPage>
</template>

<script lang="ts" setup>
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

