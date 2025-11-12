<script setup lang="ts">

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content')
)

</script>

<template>
  <UHeader toggle-side="left" mode="slideover" :menu="{side: 'left'}">
    <template #title>Catacombs of Despair</template>
		
		<template #body>
      <UContentNavigation :navigation="navigation" :default-open="false"  highlight variant="pill" />
    </template>
  </UHeader>
  <UMain>
		<UContainer>
			<slot />
		</UContainer>
  </UMain>
</template>
