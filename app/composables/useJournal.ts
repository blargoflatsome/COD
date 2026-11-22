// Shared data + helpers for the Journal pages.
export const SHARED = 'shared'

export async function useJournal() {
  // One request for everything, so the Nuxt context survives the await
  const { data } = await useAsyncData('journal-data', async () => {
    const [campaigns, sessions, quests] = await Promise.all([
      queryCollection('campaigns').order('order', 'ASC').all(),
      queryCollection('sessions').order('session', 'DESC').all(),
      queryCollection('quests').order('order', 'ASC').all()
    ])
    return { campaigns, sessions, quests }
  })

  const campaignList = computed(() => data.value?.campaigns ?? [])
  const sessionList = computed(() => data.value?.sessions ?? [])
  const questList = computed(() => data.value?.quests ?? [])

  function campaignById(id: string) {
    return campaignList.value.find(c => c.slug === id)
  }

  function colorFor(id: string) {
    return campaignById(id)?.color ?? '#a38861'
  }

  function labelFor(id: string) {
    return id === SHARED ? 'Shared' : (campaignById(id)?.name ?? id)
  }

  return { campaigns: campaignList, sessions: sessionList, quests: questList, campaignById, colorFor, labelFor }
}
