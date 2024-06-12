import { create } from 'zustand'
import { Duration } from '../types/durations'
import { getDurations } from '../services/durations'

type StoreState = {
  durations: Duration[]
  selectedDuration: Duration | null
  setDurations: (durations: Duration[]) => void
  setSelectedDuration: (selectedDuration: Duration | null) => void
  getDurationsToStore: () => void
}

const useDurationStore = create<StoreState>(set => ({
  durations: [],
  selectedDuration: null,
  setDurations: durations => set({ durations }),
  setSelectedDuration: selectedDuration => set({ selectedDuration }),
  getDurationsToStore: () => {
    getDurations().then(durations => {
      set({ durations })
    })
  }
}))

export default useDurationStore
