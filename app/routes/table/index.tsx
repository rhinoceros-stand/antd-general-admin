import React, { useEffect, useState } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Space,
  Table,
  type TableProps,
  Tag,
  Row,
  Col
} from 'antd'
import type { TableRowSelection } from 'antd/es/table/interface'
import { faker } from '@faker-js/faker'
import type { Route } from './+types/table'

const TablePage: React.FC = () => {
  interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
  }

  const [collapsed, setCollapsed] = useState(false)
  const [dataSource, setDataSource] = useState<DataType[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [form] = Form.useForm()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  useEffect(() => {
    const data: DataType[] = Array.from({ length: 100 }).map((_, i) => ({
      key: i + 1,
      name: faker.internet.username(),
      age: faker.number.int({
        min: 30,
        max: 50
      }),
      address: faker.location.streetAddress(),
      tags: ['nice', 'developer']
    }))

    setDataSource(data)
  }, [])

  /**
   *
   * @param values
   */
  const onFormUpdate = (values) => {
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange
  }

  const hasSelected = selectedRowKeys.length > 0

  return (
    <div>
      <div className='bg-white px-6 py-4 my-4'>
        <Form
          form={form}
          onValuesChange={onFormUpdate}
        >
          <Row gutter={16}>
            <Col className='gutter-row' span={6}>
              <Form.Item label='Form Layout' name='layout'>
                <Input />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={6}>
              <Form.Item label='Field A'>
                <Input placeholder='input placeholder' />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={6}>
              <Form.Item label='Field B'>
                <Input placeholder='input placeholder' />
              </Form.Item>
            </Col>
            <Col className='gutter-row' span={6}>

            </Col>
          </Row>
          <Row gutter={16} justify='end'>
            <Col className='text-right' span={6}>
              <Button
                className='mx-2'
                type='default'
              >
                重置
              </Button>
              <Button
                type='primary'
              >
                查询
              </Button>
              <Button
                type='link'
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? '收起' : '展开'}
                {collapsed ? <UpOutlined /> : <DownOutlined />}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div className='px-6 py-4 bg-white'>
        <Row className='mb-4'>
          <Col span={12}>
            <div className='flex'>
              <Button type='primary'>新建</Button>
              <Button className='mx-2' type='primary' danger>删除</Button>
            </div>
          </Col>
          <Col className='text-right' span={12}>
            <Button>刷新</Button>
          </Col>
        </Row>
        <Table<DataType>
          columns={columns}
          dataSource={dataSource}
          rowSelection={rowSelection}
          size='small'
          pagination={{
            total: 100,
            showQuickJumper: true,
            showSizeChanger: true,
            showTitle: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
        />
      </div>
    </div>
  )
}

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: 'Table Page'
    }
  ]
}

export default TablePage
