<template>
  <div class="flex flex-col gap-2">
    <UCollapsible v-for="quest in quests" :key="quest.path" class="journal-card" :default-open="defaultOpen">
      <button type="button" class="group w-full flex items-center gap-3 p-3 text-left cursor-pointer">
        <UIcon name="i-lucide-chevron-right" class="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90" />
        <span class="font-bold text-white grow">{{ quest.title }}</span>
        <JournalCampaignBadge v-if="showCampaign || quest.campaign === SHARED" :label="labelFor(quest.campaign)" :color="colorFor(quest.campaign)" />
      </button>
      <template #content>
        <div class="px-4 pb-4 pt-0 markdown journal-quest-body">
          <ContentRenderer :value="quest" />
          <div v-if="quest.tags?.length" class="flex flex-wrap gap-2 mt-3">
            <JournalTag v-for="t in quest.tags" :key="t" :tag="t" :campaign="tagCampaign" />
          </div>
        </div>
      </template>
    </UCollapsible>
    <p v-if="!quests.length" class="text-sm text-dimmed italic">Nothing here yet.</p>
  </div>
</template>

<script setup lang="ts">
import type { QuestsCollectionItem } from '@nuxt/content'

defineProps<{
  quests: QuestsCollectionItem[]
  showCampaign?: boolean
  defaultOpen?: boolean
  tagCampaign?: string
}>()

const { colorFor, labelFor } = await useJournal()
</script>
