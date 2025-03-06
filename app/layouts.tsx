import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
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
    showSideBar,
    hideSideBar
  } = useAppStore(
    useShallow((state) => ({
      collapsed: state.sideBarVisible,
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
      <Layout className='h-screen'>
        <Sider
          collapsible
          trigger={null}
          collapsed={collapsed}
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
          <Header style={{ padding: 0, background: colorBgContainer }}>
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
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default Layouts
