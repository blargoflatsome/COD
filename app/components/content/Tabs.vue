  <template>
    <UTabs :items="tabItems" color="secondary" variant="link" size="xl" class="w-full my-8">
      <template v-for="(item, index) in tabItems" :key="index" #[`tab-${index}`]>
        <slot :name="`tab-${index}`" />
      </template>
    </UTabs>
  </template>

    <script setup>
    import { defineProps, computed, useSlots } from 'vue';

    const props = defineProps({
      tabs: {
        type: String,
        required: true,
      },
    });

    const slots = useSlots();

    const tabItems = computed(() => {
      return props.tabs.split(',').map((tab, index) => ({
        label: tab.trim(),
        slot: `tab-${index}`,
      }));
    });
    </script>