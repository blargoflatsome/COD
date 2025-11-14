<template>
  <div>
    <h1>Flaws:</h1>

    <!-- random pick button -->
    <div style="margin:8px 0">
      <button type="button" @click="pickRandomFlaw">Pick random flaw</button>
      <span v-if="selectedFlawName" style="margin-left:12px">Selected: {{ selectedFlawName }}</span>
    </div>

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

    <p v-else>No flaws found.</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {flaws} from '../../tables/flaws.json';


const items = ref<any[]>(Array.isArray(flaws) ? flaws : []);
const headers = computed(() => (items.value.length ? Object.keys(items.value[0]) : []));
const selectedFlawName = ref<string | null>(null);

function isPrimitive(val: unknown) {
  return val === null || (typeof val !== 'object' && typeof val !== 'function');
}

function getNameFor(item: any) {
  if (!item) return null;
  return item.name ?? item.Name ?? item.title ?? item.label ?? null;
}

function pickRandomFlaw() {
  if (!items.value.length) {
    selectedFlawName.value = null;
    return;
  }
  const idx = Math.floor(Math.random() * items.value.length);
  const item = items.value[idx];
  const name = getNameFor(item);
  selectedFlawName.value = name ?? item.replace(/\n/g, ' ');
}
</script>