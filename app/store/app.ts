import { create } from 'zustand'

const useAppStore = create((set) => ({
  collapsed: false,
  toggleCollapsed: (collapsed: boolean) => set({ collapsed })
}))

export default useAppStore
