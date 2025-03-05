import { create } from 'zustand'

const useAppStore = create((set) => ({
  sideBarVisible: false,
  showSideBar: () => set({ sideBarVisible: true }),
  hideSideBar: () => set({ sideBarVisible: false })
}))

export default useAppStore
