<template>
  <NuxtLink :to="session.path" class="journal-card block p-4 border-l-4" :style="{ borderLeftColor: color }">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
      <JournalCampaignBadge v-if="showCampaign" :label="campaignLabel" :color="color" />
      <span class="text-xs uppercase tracking-wider text-dimmed">Session {{ session.session }}</span>
      <span v-if="session.played" class="text-xs text-dimmed">· {{ formatDate(session.played) }}</span>
    </div>
    <div class="text-lg font-bold text-white">{{ session.title }}</div>
    <p class="text-sm font-normal text-gray-300 my-1">{{ session.summary }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  session: { path: string, title: string, session: number, played?: string, summary: string }
  color: string
  campaignLabel: string
  showCampaign?: boolean
}>()

function formatDate(d: string) {
  const date = new Date(`${d}T12:00:00`)
  return Number.isNaN(date.getTime()) ? d : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>
