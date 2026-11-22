<template>
  <div>
    <UHeader toggle-side="left" mode="slideover" :menu="{side: 'left'}">
      <template #title>Catacombs of Despair</template>

      <template #body>
        <UContentNavigation :navigation="fullNavigation" :default-open="false"  highlight variant="pill" class="capitalize" />
      </template>
    </UHeader>

    <UMain class="overflow-x-clip">
      <UContainer class="mb-10">
        <slot />
      </UContainer>
      <BackToTop />
    </UMain>

    <UFooter>
        <template #left>
          <div class="flex flex-col">
            <h2 class="text-muted text-base">Useful Links</h2>
            <ul class="list-disc list-inside text-muted text-sm">
              <li><a href="https://www.aftermidnightgaming.com/wp-content/uploads/2021/02/727668-Discerning_Merchants_Price_Guide_v4.1.pdf" target="_blank" rel="noopener">Discerning Merchants Price Guide</a></li>
              <li><a href="https://www.dndbeyond.com/campaigns/join/58697612909311391" target="_blank" rel="noopener">Join Campaign</a></li>
            </ul>
          </div>
        </template>

        <template #right>
          <p class="text-muted text-sm">
            Copyright © {{ new Date().getFullYear() }} Catacombs of Despair
          </p>
        </template>

    </UFooter>
  </div>
</template>

<script setup lang="ts">
import { findPageChildren } from '@nuxt/content/utils'
const router = useRouter()
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)
const children = navigation.value ? findPageChildren(navigation.value, '/c') : []

const pageRoutes = router
  .getRoutes()
  .filter((route) => {
    // Exclude the root index page
    if (route.path === '/') return false

    // Exclude any routes under /c/
    if (route.path.startsWith('/c/')) return false

    // Exclude dynamic routes (e.g. individual journal sessions)
    if (route.path.includes(':')) return false

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


