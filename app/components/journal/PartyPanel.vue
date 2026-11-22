<template>
  <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
    <div v-for="member in party" :key="member.name" class="journal-card p-3 border-t-2" :style="{ borderTopColor: color }">
      <div class="flex items-center gap-2">
        <span class="font-bold text-white">{{ member.name }}</span>
        <span v-if="member.npc" class="text-[0.65rem] uppercase tracking-wider text-dimmed border border-default rounded px-1">NPC</span>
      </div>
      <ul v-if="member.notes?.length" class="mt-2 space-y-1">
        <li v-for="note in member.notes" :key="note" class="text-sm text-gray-300 flex gap-2">
          <span class="text-dimmed">•</span>{{ note }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  party: { name: string, npc?: boolean, notes?: string[] }[]
  color: string
}>()
</script>
