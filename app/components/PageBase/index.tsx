import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'

const { Header, Sider, Content } = Layout

type PageBaseProps = {
  collapsed: boolean
  onToggleMenu: (collapsed: boolean) => void
}

const PageBase: React.FC<PageBaseProps> = ({ collapsed, onToggleMenu }) => {
  const {
    token: {
      colorBgContainer,
      borderRadiusLG
    }
  } = theme.useToken()

  return (
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
            onClick={() => onToggleMenu(!collapsed)}
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
  )
}

export default PageBase
