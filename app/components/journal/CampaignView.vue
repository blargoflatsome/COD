<template>
  <div class="flex flex-col gap-2">
    <p v-if="campaign.subtitle" class="text-sm uppercase tracking-wider text-dimmed m-0">{{ campaign.subtitle }}</p>

    <template v-if="!tag">
      <h2>The Party</h2>
      <JournalPartyPanel :party="campaign.party ?? []" :color="campaign.color" />

      <template v-if="latest?.leftOff?.length">
        <h2>Where We Left Off</h2>
        <JournalLeftOff :items="latest.leftOff" :color="campaign.color" :heading="`After session ${latest.session}: ${latest.title}`">
          <NuxtLink :to="latest.path" class="text-sm inline-block mt-3">Read the full session →</NuxtLink>
        </JournalLeftOff>
      </template>
    </template>

    <h2>Session Log</h2>
    <JournalSessionLog :sessions="campaignSessions" :color="campaign.color" :campaign-label="campaign.name" />

    <h2>Active Quests</h2>
    <JournalQuestList :quests="active" :tag-campaign="campaign.slug" />

    <h2>Completed</h2>
    <JournalQuestList :quests="completed" :tag-campaign="campaign.slug" />
  </div>
</template>

<script setup lang="ts">
import type { CampaignsCollectionItem } from '@nuxt/content'

const props = defineProps<{ campaign: CampaignsCollectionItem, tag?: string }>()

const { sessions, quests } = await useJournal()

const hasTag = (tags?: string[]) => !props.tag || (tags ?? []).includes(props.tag)

// sessions come newest first
const campaignSessions = computed(() =>
  sessions.value.filter(s => s.campaign === props.campaign.slug && hasTag(s.tags))
)
const latest = computed(() => sessions.value.find(s => s.campaign === props.campaign.slug))

// Only this campaign's own quests; shared quests live on the World tab
const campaignQuests = computed(() =>
  quests.value.filter(q => q.campaign === props.campaign.slug && hasTag(q.tags))
)
const active = computed(() => campaignQuests.value.filter(q => q.status === 'active'))
const completed = computed(() => campaignQuests.value.filter(q => q.status === 'completed'))
</script>
