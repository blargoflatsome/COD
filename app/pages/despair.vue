<template>
  <div>
    <h1 class="relative border-b border-default pb-4 text-3xl sm:text-4xl text-pretty font-bold text-highlighted">Despair:</h1>
    <NuxtImg src="/images/banner2.png" alt="flaws banner" class="w-full h-auto" placeholder  />
    <h2>What is Despair?</h2>
    <p>This world has a draining effect on the body and mind. A player will accumulate Despair over the course of the game in a variety of ways.</p>
    <p>Every time you gain 3 ranks in Despair you will also suffer a Flaw. More on that below.</p>

    <h2>How to Gain Despair</h2>
    <p>Whenever the DM feels it is warranted he may give or remove Despair. This could be for plot reasons or player actions. Some monsters or locations may also inflict Despair</p>
    <p><strong>Fumble</strong> any time you roll a 1 on a D20 you gain a Despair.</p>

    <h2>How to Lose Despair</h2>
    <p>Insiration may be spent during a long rest to remove Despair</p>
    <p><strong>Critical Success</strong> any time you roll a 20 on a D20 you may remove 1 Despair.</p>

    <h2>Flaws</h2>
    <p>Flaws are the consequence of Despair. Once you have accumulated 3 levels of Despair, you will gain a random flaw.</p>

    <blockquote>Flaws marked Permanent last until you find a way in game to remove them, otherwise all flaws last until your next <strong>long rest</strong></blockquote>

    <UModal class="my-6">
      <UButton color="secondary" @click="pickRandomFlaw">Pick random flaw</UButton>

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

    <h2>**Spoilers**</h2>
    <UCollapsible class="">
      <UButton
        label="Open Flaw Table"
        color="primary"
        variant="outline"
        icon="i-lucide-search"
      />

      <template #content>
        <table v-if="items.length" border="1" cellspacing="0" cellpadding="6" class="mt-8">
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