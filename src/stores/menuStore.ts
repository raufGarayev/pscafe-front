import { create } from 'zustand'
import { getMenu } from '../services/menu'

type StoreState = {
  menu: []
  selectedMenu: null
  setMenuToStore: () => void
  setSelectedMenu: (selectedMenu: any) => void
}

const useMenuStore = create<StoreState>(set => ({
  menu: [],
  selectedMenu: null,
  setMenuToStore: () => {
    getMenu().then(res => {
      set({ menu: res.data })
    })
  },
  setSelectedMenu: selectedMenu => set({ selectedMenu })
}))

export default useMenuStore
