import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { SidebarProvider } from '~/components/ui/sidebar'
import { AppSidebar} from '~/components/app-sidebar'
import { useShallow } from 'zustand/react/shallow'
import { useAppStore } from './store'
import menus from './config/menus'

const Layouts = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const { pathname } = location

  const {
    collapsed,
    toggleCollapsed
  } = useAppStore(
    useShallow((state) => ({
      collapsed: state.collapsed,
      toggleCollapsed: state.toggleCollapsed
    }))
  )

  const items: MenuProps['items'] = [
    {
      key: 'message',
      label: '消息中心',
      icon: ''
    },
    {
      key: 'settings',
      label: '系统设置',
      icon: ''
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
      icon: ''
    }
  ]

  /**
   *
   * @param collapsed
   */
  const handleSideBarChange = (collapsed: boolean) => {
    toggleCollapsed(collapsed)
  }

  /**
   *
   * @param key
   */
  const handleMenuSelect = (key: string) => {
    const path = key.split('.').filter(el => el).join('/')
    navigate(path)
  }

  /**
   * 获取选中路径
   * @param path
   */
  const getCurrentPathKeys = (path: string) => {
    return path.split('/').filter(item => item)
  }

  /**
   * 展示菜单
   * @param dataList
   */
  const renderMenus = (dataList, parent?) => {
    return dataList.map(item => ({
      key: [parent?.key, item.key].filter(el => el).join('.'),
      label: item.label || item.key,
      children: item.children?.length > 0 ? renderMenus(item.children, item) : null,
      icon: item.icon
    }))
  }

  return (
    <div className='w-screen h-screen'>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}

export default Layouts
