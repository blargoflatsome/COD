<template>
  <div class="journal-callout" :style="{ borderLeftColor: color }">
    <div class="text-xs font-bold uppercase tracking-wider mb-2" :style="{ color }">{{ heading }}</div>
    <ul class="space-y-1.5">
      <li v-for="item in items" :key="item" class="flex gap-2 text-gray-200">
        <UIcon name="i-lucide-flame" class="size-4 mt-1 shrink-0" :style="{ color }" />
        <span>{{ item }}</span>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ items: string[], color: string, heading?: string }>(), { heading: 'Where we left off' })
</script>
