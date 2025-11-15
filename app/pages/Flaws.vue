<template>
  <div>
    <h1 class="relative border-b border-default pb-4 text-3xl sm:text-4xl text-pretty font-bold text-highlighted">Flaws:</h1>
  
    <p>Flaws are the consequence of Despair. Once you have accumulated 3 levels of Despair, you will pick a random flaw.</p>

    <p>Flaws marked Permanent last until you find a way in game to remove them, otherwise all flaws last until your next <strong>long rest</strong></p>
    <UModal class="my-6">
      <UButton color="info" @click="pickRandomFlaw">Pick random flaw</UButton>

      <template #content>
        <div v-if="selectedFlaw" class="p-4 space-y-4">
          <strong>{{ selectedFlaw.name }}</strong>
          <p v-if="selectedFlaw.permanent">Permanent</p>
          <div v-if="selectedFlaw.description">{{ selectedFlaw.description }}</div>
          <div v-if="selectedFlaw.options">
            {{ selectedRandomOption?.name }} <template v-if="selectedRandomOption?.effect">- {{ selectedRandomOption?.effect }}</template>
          </div>
        </div>
      </template>
    </UModal>

    <p><NuxtImg src="/images/banner2.png" alt="flaws banner" class="w-full h-auto" placeholder  /></p>

    <UCollapsible class="">
      <UButton
        label="View All Flaws"
        color="primary"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
      />

      <template #content>
        <table v-if="items.length" border="1" cellspacing="0" cellpadding="6">
          <thead>
            <tr>
              <th v-for="key in headers" :key="key">{{ key }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in items" :key="rowIndex">
              <td v-for="key in headers" :key="key">
                <span v-if="isPrimitive(row[key])">{{ row[key] }}</span>
                <ul v-else>
                  <li v-for="(val, prop) in row[key]" :key="prop">
                    {{ val.name }}: {{ val.effect }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </UCollapsible>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {flaws} from '../../tables/flaws.json';


const items = ref<any[]>(Array.isArray(flaws) ? flaws : []);
const headers = computed(() => (items.value.length ? Object.keys(items.value[0]) : []));
const selectedFlaw = ref<any>(null);

function isPrimitive(val: unknown) {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
}


function pickRandomFlaw() {
  if (!items.value.length) {
    selectedFlaw.value = null;
    return;
  }
  const idx = Math.floor(Math.random() * items.value.length);
  const item = items.value[idx];
  selectedFlaw.value = item
}

const selectedRandomOption = computed(() => {
  if (!selectedFlaw.value?.options || selectedFlaw.value.options.length === 0) {
    return null;
  }
  const idx = Math.floor(Math.random() * selectedFlaw.value.options.length);
  return selectedFlaw.value.options[idx];
});
</script>