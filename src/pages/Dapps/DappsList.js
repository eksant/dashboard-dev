import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Table, Divider, Button, Icon, Tag, Popconfirm } from 'antd'

import PageError from '../PageError'

const DappsList = props => {
  const { title } = props
  const { onRefresh, onDeleteData } = props
  const { loading, error, message, datas, path } = props

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
    },
    {
      title: 'Host Name',
      dataIndex: 'hostname',
    },
    {
      title: 'Domain Name',
      dataIndex: 'domainname',
    },
    {
      title: 'Port',
      dataIndex: 'port',
    },
    {
      title: 'Status',
      render: record => {
        const color = record.status ? 'green' : 'magenta'
        return (
          <Tag color={color} size="small">
            {record.status ? 'Active' : 'Inactive'}
          </Tag>
        )
      },
    },
    {
      align: 'right',
      render: record => {
        return (
          <span>
            <Link to={`${path}/${record._id}`}>
              <Button type="link" icon="edit" size="small">
                Edit
              </Button>
            </Link>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this record?" onConfirm={() => onDeleteData(record._id)} okText="Yes" cancelText="No">
              <Button type="link" icon="delete" className="red-color" size="small">
                Delete
              </Button>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  return (
    <Card
      title={<h3>{title}</h3>}
      size="small"
      extra={
        <span>
          <Button onClick={onRefresh} className="margin-buttons">
            <Icon type="sync" />
            Refresh
          </Button>
          <Link to={`${path}/new`}>
            <Button disabled={error} type="primary" className="margin-buttons">
              <Icon type="plus-circle" />
              New Data
            </Button>
          </Link>
        </span>
      }
    >
      {error ? (
        <PageError message={message} />
      ) : (
        <Table columns={columns} dataSource={datas} loading={loading} pagination={false} size={'small'} />
      )}
    </Card>
  )
}

export default DappsList
