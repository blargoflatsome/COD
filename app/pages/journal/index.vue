<template>
  <div>
    <h1>Journal</h1>
    <p class="text-gray-300">What has happened so far, the quests still open, and where each party stands.</p>

    <div v-if="activeTag" class="journal-callout flex flex-wrap items-center gap-3 my-4" style="border-left-color: var(--color-action-light)">
      <span>Showing everything tagged</span>
      <JournalTag :tag="activeTag" />
      <NuxtLink :to="{ path: '/journal', query: { c: tab } }" class="text-sm">Clear filter</NuxtLink>
    </div>

    <UTabs v-model="tab" :items="tabItems" color="secondary" variant="link" size="xl" class="w-full my-6">
      <template v-for="c in campaigns" :key="c.slug" #[c.slug]>
        <JournalCampaignView :campaign="c" :tag="activeTag" />
      </template>
      <template #world>
        <JournalWorldView :tag="activeTag" />
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

useSeoMeta({ title: 'Journal', ogTitle: 'Journal' })

const route = useRoute()
const router = useRouter()
const { campaigns } = await useJournal()

const tabItems = computed<TabsItem[]>(() => [
  ...campaigns.value.map(c => ({ label: c.name, value: c.slug, slot: c.slug })),
  { label: 'World', value: 'world', slot: 'world', icon: 'i-lucide-globe' }
])

const activeTag = computed(() => typeof route.query.tag === 'string' ? route.query.tag : undefined)

const tab = computed({
  get: () => {
    const q = route.query.c
    const ids = tabItems.value.map(t => t.value)
    return typeof q === 'string' && ids.includes(q) ? q : (campaigns.value[0]?.slug ?? 'world')
  },
  set: (value: string | number) => {
    router.replace({ query: { ...route.query, c: String(value) } })
  }
})
</script>
