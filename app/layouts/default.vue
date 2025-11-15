<template>
  <UHeader toggle-side="left" mode="slideover" :menu="{side: 'left'}">
    <template #title>Catacombs of Despair</template>
		
		<template #body>
      <UContentNavigation :navigation="fullNavigation" :default-open="false"  highlight variant="pill" />
    </template>
  </UHeader>
  <UMain>
		<UContainer class="mb-10">
			<slot />
		</UContainer>
  </UMain>
</template>


<script setup lang="ts">
import { findPageChildren } from '@nuxt/content/utils'
const router = useRouter()

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)
const children = findPageChildren(navigation.value, '/c')

const pageRoutes = router
  .getRoutes()
  .filter((route) => {
    // Exclude the root index page
    if (route.path === '/') return false

    // Exclude any routes under /c/
    if (route.path.startsWith('/c/')) return false

    // Otherwise, include
    return true
  })
  .map((r) => ({
    title: r.name || r.path.replace('/', ''),
    path: r.path,
  }))

const fullNavigation = [...children, ...pageRoutes].sort((a, b) =>
  a.title.localeCompare(b.title)
)
</script>


