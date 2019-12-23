import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Table, Button, Icon, Tag, Popconfirm, Divider } from 'antd'

import PageError from '../PageError'

const DappsList = props => {
  const { title } = props
  const { onRefresh, onDeleteData } = props
  const { loading, error, message, datas, path } = props

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      // ellipsis: false,
    },
    {
      title: 'Dapp Name',
      render: record => {
        const link = record.ipfsHash ? `/dapps/upload?id=${record.id}&ipfs=${record.ipfsHash}` : `/dapps/upload?id=${record.id}`
        return <Link to={link}>{record.name}</Link>
      },
    },
    {
      title: 'IP Local',
      dataIndex: 'IpLocal',
    },
    {
      title: 'IP Public',
      dataIndex: 'IpPublic',
    },
    {
      title: 'Port',
      dataIndex: 'port',
    },
    {
      title: 'Status',
      render: record => {
        const color = record.phase === 'Running' ? 'green' : 'magenta'
        return (
          <Tag color={color} size="small">
            {record.phase}
          </Tag>
        )
      },
    },
    {
      title: 'Created At',
      dataIndex: 'dappCreated',
      render: dappCreated => moment(dappCreated).format('DD MMM YYYY hh:mm'),
    },
    {
      ellipsis: false,
      align: 'right',
      render: record => {
        const link = record.ipfsHash ? `/dapps/upload?id=${record.id}&ipfs=${record.ipfsHash}` : `/dapps/upload?id=${record.id}`
        return (
          <span>
            <Link to={link}>
              <Button type="link" icon="cloud-upload" size="small">
                Upload
              </Button>
            </Link>
            <Divider type="vertical" />
            <Popconfirm title="Are you sure delete this record?" onConfirm={() => onDeleteData(record.id)} okText="Yes" cancelText="No">
              <Button type="link" icon="delete" className="red-color" size="small">
                Delete
              </Button>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  return error ? (
    <PageError message={message} />
  ) : (
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
              Create Dapp
            </Button>
          </Link>
        </span>
      }
    >
      <Table columns={columns} dataSource={datas} size="small" loading={loading} pagination={true} />
    </Card>
  )
}

export default DappsList
