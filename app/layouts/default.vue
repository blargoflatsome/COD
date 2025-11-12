<script setup lang="ts">

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)

</script>

<template>
  <UHeader toggle-side="left">
    <template #title>Catacombs of Despair</template>
		<UDrawer>
			<UButton label="Open" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

			<template #content>
				<UContentNavigation :navigation="navigation" :default-open="false"  highlight highlight-color="primary" color="primary" variant="pill" />
			</template>
		</UDrawer>

    <template #right>
			Right Side
    </template>
  </UHeader>
  <UPage>
		<slot />
  </UPage>
</template>
