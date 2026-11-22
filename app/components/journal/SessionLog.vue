<template>
  <div>
    <p v-if="!sessions.length" class="text-sm text-dimmed italic">No sessions logged yet.</p>

    <template v-else>
      <!-- One session at a time, newest first. Swipe/drag or use the buttons to move between them. -->
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="sessions"
        :ui="{ item: 'basis-full' }"
        @select="index = $event"
      >
        <JournalSessionCard
          :session="item"
          :color="colorFor ? colorFor(item.campaign) : (color ?? '')"
          :campaign-label="labelFor ? labelFor(item.campaign) : (campaignLabel ?? '')"
          :show-campaign="showCampaign"
        />
      </UCarousel>

      <div v-if="sessions.length > 1" class="flex items-center justify-between gap-2 mt-2">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="Newer"
          :disabled="index === 0"
          @click="carousel?.emblaApi?.scrollPrev()"
        />
        <span class="text-xs text-dimmed" aria-live="polite">
          {{ index + 1 }} of {{ sessions.length }}
        </span>
        <UButton
          color="neutral"
          variant="ghost"
          trailing-icon="i-lucide-arrow-right"
          label="Older"
          :disabled="index === sessions.length - 1"
          @click="carousel?.emblaApi?.scrollNext()"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
type Session = { path: string, title: string, session: number, played?: string, summary: string, campaign: string }

const props = defineProps<{
  sessions: Session[] // newest first
  color?: string
  campaignLabel?: string
  showCampaign?: boolean
  colorFor?: (id: string) => string
  labelFor?: (id: string) => string
}>()

const carousel = useTemplateRef<{ emblaApi?: { scrollPrev: () => void, scrollNext: () => void, scrollTo: (i: number) => void } }>('carousel')
const index = ref(0)

// When the list changes (e.g. a tag filter), go back to the newest session
watch(() => props.sessions.map(s => s.path).join(), () => {
  index.value = 0
  carousel.value?.emblaApi?.scrollTo(0)
})
</script>
