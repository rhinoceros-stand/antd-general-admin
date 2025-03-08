import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  theme
} from 'antd'
import type { MenuProps } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { useAppStore } from './store'

const { Header, Sider, Content } = Layout

const Layouts = ({ children }: { children: React.ReactNode }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG
    }
  } = theme.useToken()

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
      icon: <MessageOutlined />
    },
    {
      key: 'settings',
      label: '系统设置',
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      danger: true,
      label: '退出登录',
      icon: <PoweroffOutlined />
    }
  ]

  /**
   *
   * @param collapsed
   */
  const handleSideBarChange = (collapsed: boolean) => {
    toggleCollapsed(collapsed)
  }

  return (
    <div className='w-screen h-screen'>
      <Layout className='h-screen'>
        <Sider
          collapsible
          collapsed={collapsed}
          trigger={null}
          width={260}
        >
          <div className='h-[32px] m-[16px] bg-stone-600 rounded-md' />
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1'
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2'
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3'
              }
            ]}
          />
        </Sider>
        <Layout>
          <Header
            className='flex justify-between'
            style={{ padding: 0, background: colorBgContainer }}
          >
            <div>
              <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => handleSideBarChange(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64
                }}
              />
            </div>
            <div className='mx-8 flex items-center'>
              <Dropdown menu={{ items }}>
                <div className='flex items-center justify-center p-2 rounded-md hover:bg-gray-500/50'>
                  <Avatar />
                  <div className='pl-4 h-[16px] leading-none'>Username</div>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Layouts
