import { HomeOutlined, LayoutOutlined, SettingOutlined } from '@ant-design/icons'

export default [
  {
    key: 'dashboard',
    icon: <HomeOutlined />,
    label: '工作台'
  },
  {
    key: 'table',
    icon: <HomeOutlined />,
    label: '搜索表格'
  },
  {
    key: 'system',
    icon: <SettingOutlined />,
    label: '系统管理',
    children: [
      {
        key: 'users'
      },
      {
        key: 'roles'
      },
      {
        key: 'departments'
      }
    ]
  },
  {
    key: 'settings',
    icon: <LayoutOutlined />,
    label: '系统设置',
    children: []
  }
]
