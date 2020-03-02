import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Table, Button, Icon, Tag, Popconfirm, Avatar, Divider } from 'antd'

import PageError from '../PageError'

const DappsList = ({ title, path, loading, error, message, datas, onRefresh, onDeleteData }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      width: 30,
      // ellipsis: false,
    },
    {
      title: 'Logo',
      dataIndex: 'logoUrl',
      width: 76,
      render: logoUrl => <Avatar shape="square" size={56} src={logoUrl} />,
    },
    {
      title: 'Dapp Name',
      dataIndex: 'name',
      // render: record => {
      //   const link = record.ipfsHash ? `/dapps/upload?id=${record.id}&ipfs=${record.ipfsHash}` : `/dapps/upload?id=${record.id}`
      //   return <Link to={link}>{record.name}</Link>
      // },
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'IP Public',
      dataIndex: 'ipPublic',
      ellipsis: true,
      render: ipPublic => (
        <label>
          {ipPublic ? (
            <a href={ipPublic} target="_blank" rel="noopener noreferrer">
              {ipPublic}
            </a>
          ) : (
            'waiting..'
          )}
        </label>
      ),
    },
    {
      title: 'Gun DB',
      dataIndex: 'gunDb',
      ellipsis: true,
      render: gunDb => (
        <label>
          {gunDb ? (
            <a href={gunDb} target="_blank" rel="noopener noreferrer">
              {gunDb}
            </a>
          ) : (
            'waiting..'
          )}
        </label>
      ),
    },
    {
      title: 'DApp Publish',
      dataIndex: 'ipfsUrl',
      ellipsis: true,
      render: ipfsUrl => (
        <label>
          {ipfsUrl ? (
            <a href={ipfsUrl} target="_blank" rel="noopener noreferrer">
              {ipfsUrl}
            </a>
          ) : (
            'waiting..'
          )}
        </label>
      ),
    },
    {
      title: 'Status',
      render: record => {
        const color = record.dappStatus === 'Publish' ? 'blue' : record.dappStatus === 'Pending' ? 'orange' : 'green'
        return (
          <Tag color={color} size="small">
            {record.dappStatus}
          </Tag>
        )
      },
    },
    {
      title: 'Created At',
      dataIndex: 'dappCreated',
      ellipsis: false,
      render: dappCreated => moment(dappCreated).format('DD MMM YYYY hh:mm'),
    },
    {
      ellipsis: false,
      align: 'right',
      // fixed: 'left',
      width: 280,
      render: record => {
        const link = record.ipfsHash ? `/dapps/upload?id=${record.id}&ipfs=${record.ipfsHash}` : `/dapps/upload?id=${record.id}`
        const disabled = record.dappStatus === 'Pending'
        return (
          <span>
            <Link to={link}>
              <Button type="link" icon="cloud-upload" size="small" disabled={disabled}>
                Upload
              </Button>
            </Link>
            <Divider type="vertical" />
            <Link to={`${path}/edit/${record.id}`}>
              <Button type="link" icon="edit" size="small">
                Edit
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
