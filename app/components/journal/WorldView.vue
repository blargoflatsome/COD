<template>
  <div class="flex flex-col gap-2">
    <p class="text-sm text-dimmed m-0">Every session from both campaigns, in the order they were played.</p>

    <h2>Timeline</h2>
    <ol class="journal-timeline">
      <li v-for="s in timeline" :key="s.path" class="relative pl-8 pb-4">
        <span class="absolute left-0 top-5 size-3 rounded-full ring-4 ring-black" :style="{ background: colorFor(s.campaign) }" />
        <JournalSessionCard :session="s" :color="colorFor(s.campaign)" :campaign-label="labelFor(s.campaign)" show-campaign />
      </li>
    </ol>
    <p v-if="!timeline.length" class="text-sm text-dimmed italic">No sessions logged yet.</p>

    <h2>Shared Threads</h2>
    <p class="text-sm text-dimmed m-0 mb-2">Quests and events from before the party split at the Waterfall.</p>
    <JournalQuestList :quests="shared" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ tag?: string }>()

const { sessions, quests, campaigns, colorFor, labelFor } = await useJournal()

const hasTag = (tags?: string[]) => !props.tag || (tags ?? []).includes(props.tag)
const order = (id: string) => campaigns.value.find(c => c.slug === id)?.order ?? 99

// Newest first. Sessions with a "played" date sort by date; otherwise by session number.
const timeline = computed(() =>
  sessions.value
    .filter(s => hasTag(s.tags))
    .slice()
    .sort((a, b) => {
      if (a.played && b.played && a.played !== b.played) return b.played.localeCompare(a.played)
      if (a.session !== b.session) return b.session - a.session
      return order(a.campaign) - order(b.campaign)
    })
)

const shared = computed(() =>
  quests.value
    .filter(q => q.campaign === SHARED && hasTag(q.tags))
    .slice()
    .sort((a, b) => Number(a.status === 'completed') - Number(b.status === 'completed'))
)
</script>
