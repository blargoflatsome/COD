<template>
  <NuxtLink
    :to="{ path: '/journal', query: { tag, ...(campaign ? { c: campaign } : {}) } }"
    class="journal-tag"
  >
    {{ tag }}
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ tag: string, campaign?: string }>()
</script>

<style scoped>
.journal-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid var(--color-gray-dark);
  color: var(--color-gray-light);
  background: rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}
.journal-tag:hover {
  border-color: var(--color-action-light);
  color: var(--color-action-light);
}
</style>
