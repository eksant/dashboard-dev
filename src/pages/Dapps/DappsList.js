import React from 'react'
import moment from 'moment'
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
      ellipsis: false,
    },
    // {
    //   title: 'Dapp UID',
    //   dataIndex: 'dappUid',
    //   ellipsis: true,
    // },
    {
      title: 'Dapp Name',
      dataIndex: 'name',
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
      title: 'Hash File',
      dataIndex: 'ipfsHash',
      ellipsis: false,
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
        return (
          <span>
            <Link to={`upload/${record.id}`}>
              <Button type="link" icon="cloud-upload" size="small" disabled>
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
              Create Dapp
            </Button>
          </Link>
        </span>
      }
    >
      {error ? (
        <PageError message={message} />
      ) : (
        <Table
          columns={columns}
          dataSource={datas}
          // ellipsis={false}
          size="small"
          // tableLayout="fixed"
          loading={loading}
          pagination={true}
          // columns={columns.map(item => {
          //   console.log
          //   ({ ...item, ellipsis:  true })})}
        />
      )}
    </Card>
  )
}

export default DappsList
