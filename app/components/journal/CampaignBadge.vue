<template>
  <span class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider" :style="{ color }">
    <span class="size-2 rounded-full" :style="{ background: color }" />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ label: string, color: string }>()
</script>
