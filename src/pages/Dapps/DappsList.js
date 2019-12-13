import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Table, Divider, Button, Icon, Popconfirm } from 'antd'

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
      title: 'Dapp Name',
      dataIndex: 'name',
    },
    {
      title: 'IP Address',
      dataIndex: 'hostIP',
    },
    {
      title: 'Port',
      dataIndex: 'port',
    },
    {
      title: 'Dapp UID',
      dataIndex: 'dappUid',
    },
    {
      title: 'Created At',
      dataIndex: 'dappCreated',
      render: dappCreated => moment(dappCreated).format('DD MMM YYYY hh:mm'),
    },
    {
      align: 'right',
      render: record => {
        return (
          <span>
            <Link to={`upload/${record.id}`}>
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
        <Table columns={columns} dataSource={datas} loading={loading} pagination={false} size={'small'} />
      )}
    </Card>
  )
}

export default DappsList
