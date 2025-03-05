import { useShallow } from 'zustand/react/shallow'
import PageBase from './components/PageBase'
import { useAppStore } from './store'

function App() {
  const {
    sideBarVisible,
    showSideBar,
    hideSideBar
  } = useAppStore(
    useShallow((state) => ({
      sideBarVisible: state.sideBarVisible,
      showSideBar: state.showSideBar,
      hideSideBar: state.hideSideBar
    }))
  )

  /**
   *
   * @param collapsed
   */
  const handleSideBarChange = (collapsed: boolean) => {
    if (collapsed) {
      showSideBar()
    } else {
      hideSideBar()
    }
  }

  return (
    <div className='w-screen h-screen'>
      <PageBase
        collapsed={sideBarVisible}
        onToggleMenu={handleSideBarChange}
      />
    </div>
  )
}

export default App
