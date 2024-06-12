import { create } from 'zustand'

type StoreState = {
  selectedTab: 'general' | 'prices' | 'durations' | 'branches'
  cafeName: string
  setSelectedTab: (selectedTab: 'general' | 'prices' | 'durations' | 'branches') => void
}

const useSettingsStore = create<StoreState>(set => ({
  selectedTab: 'general',
  cafeName: 'Cafe',
  totalTables: 0,
  setSelectedTab: selectedTab => set({ selectedTab })
}))

export default useSettingsStore
