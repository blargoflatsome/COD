<template>
  <article v-if="page">
    <NuxtLink :to="{ path: '/journal', query: { c: page.campaign } }" class="text-sm inline-flex items-center gap-1 mt-6">
      <UIcon name="i-lucide-arrow-left" class="size-4" /> {{ labelFor(page.campaign) }} Journal
    </NuxtLink>

    <div class="flex flex-wrap items-center gap-3 mt-4">
      <JournalCampaignBadge :label="labelFor(page.campaign)" :color="color" />
      <span class="text-xs uppercase tracking-wider text-dimmed">Session {{ page.session }}</span>
    </div>
    <h1 class="mt-1!">{{ page.title }}</h1>

    <div v-if="previous" class="journal-callout text-sm" style="border-left-color: var(--color-gray-dark)">
      <div class="text-xs font-bold uppercase tracking-wider text-dimmed mb-1">
        Previously, in session {{ previous.session }}
      </div>
      {{ previous.summary }}
      <NuxtLink :to="previous.path" class="ml-1">Read it →</NuxtLink>
    </div>

    <ContentRenderer :value="page" class="markdown mt-6" />

    <div v-for="m in page.meanwhile" :key="m.text" class="journal-callout text-sm my-4" style="border-left-color: var(--color-action-dark)">
      <div class="text-xs font-bold uppercase tracking-wider mb-1" style="color: var(--color-action-light)">Meanwhile…</div>
      {{ m.text }}
      <NuxtLink v-if="m.to" :to="m.to" class="ml-1">Read more →</NuxtLink>
    </div>

    <JournalLeftOff v-if="page.leftOff?.length" :items="page.leftOff" :color="color" class="mt-8" />

    <div v-if="page.tags?.length" class="flex flex-wrap gap-2 mt-6">
      <JournalTag v-for="t in page.tags" :key="t" :tag="t" :campaign="page.campaign" />
    </div>

    <nav class="flex justify-between gap-4 mt-10 pt-4 border-t border-default">
      <UButton v-if="previous" :to="previous.path" color="neutral" variant="ghost" icon="i-lucide-arrow-left" :label="`Session ${previous.session}`" />
      <span v-else />
      <UButton v-if="next" :to="next.path" color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" :label="`Session ${next.session}`" />
    </nav>
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { sessions, colorFor, labelFor } = await useJournal()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('sessions').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Session not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title ?? 'Journal',
  ogTitle: () => page.value?.title ?? 'Journal',
  description: () => page.value?.summary,
  ogDescription: () => page.value?.summary
})

const color = computed(() => colorFor(page.value?.campaign ?? ''))

// sessions are sorted newest first
const sameCampaign = computed(() =>
  sessions.value.filter(s => s.campaign === page.value?.campaign).slice().sort((a, b) => a.session - b.session)
)
const index = computed(() => sameCampaign.value.findIndex(s => s.path === page.value?.path))
const previous = computed(() => index.value > 0 ? sameCampaign.value[index.value - 1] : undefined)
const next = computed(() => index.value >= 0 ? sameCampaign.value[index.value + 1] : undefined)
</script>
