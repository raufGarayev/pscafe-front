import { create } from 'zustand'
import { Tariff } from '../types/tariffs'
import { getTariffs } from '../services/tariffs'

type StoreState = {
  tariffs: Tariff[]
  selectedTariff: Tariff | null
  setTariffs: (tariffs: Tariff[]) => void
  setSelectedTariff: (selectedTariff: Tariff | null) => void
  getTariffsToStore: () => void
}

const useTariffsStore = create<StoreState>(set => ({
  tariffs: [],
  selectedTariff: null,
  setTariffs: tariffs => set({ tariffs }),
  setSelectedTariff: selectedTariff => set({ selectedTariff }),
  getTariffsToStore: () => {
    getTariffs().then(tariffs => {
      set({ tariffs })
    })
  }
}))

export default useTariffsStore
