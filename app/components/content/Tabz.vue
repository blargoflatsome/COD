<template>
  <UTabs :items="tabItems" color="secondary" variant="link" size="xl" class="w-full my-8">
    <template v-for="(item, index) in tabItems" :key="index" #[`tab-${index}`]>
      <slot :name="`tab-${index}`" />
    </template>
  </UTabs>
</template>

<script setup lang="ts">
// Used in markdown as ::Tabz{tabs="One, Two"} with #tab-0, #tab-1 ... slots
const props = defineProps<{ tabs: string }>()

const tabItems = computed(() =>
  props.tabs.split(',').map((tab, index) => ({
    label: tab.trim(),
    slot: `tab-${index}`
  }))
)
</script>
