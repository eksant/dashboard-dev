import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Button, Icon, Descriptions, Tag, Skeleton, Table, Upload } from 'antd'

import PageError from '../PageError'

const DappsUpload = props => {
  const { title } = props
  const { loading, error, message, data } = props
  const { onRefresh, onUploadDapp, onGetDetailIpfs } = props
  const { loadingIpfs, datasIpfs } = props

  const propsUpload = onUploadDapp(false)
  const color = data && data.phase ? (data.phase === 'Running' ? 'green' : 'magenta') : null
  const dappUploads =
    datasIpfs &&
    datasIpfs.map(i => {
      i.key = i.Hash
      return i
    })

  const columns = [
    {
      key: 'Name',
      title: 'Name',
      render: record => {
        return record.Type < 2 ? (
          <span onClick={() => onGetDetailIpfs(record.Hash)} style={{ cursor: 'pointer' }}>
            <Icon type="folder-open" theme="filled" style={{ marginRight: '5px' }} />
            {record.Name}
          </span>
        ) : (
          <span>
            <Icon type={record.Type === 3 ? 'file-exclamation' : 'file'} style={{ marginRight: '5px' }} />
            {record.Name}
          </span>
        )
      },
    },
    {
      key: 'Size',
      title: 'Size',
      dataIndex: 'Size',
      render: Size => <label>{Size > 0 ? `${Size} Byte` : null}</label>,
    },
  ]

  return error ? (
    <PageError message={message} />
  ) : (
    <Row gutter={16}>
      <Col span={14}>
        <Card
          title={<h3>{title}</h3>}
          size="small"
          extra={
            <span>
              <Link to="/dapps">
                <Button className="margin-buttons">
                  <Icon type="left-circle" />
                  Back
                </Button>
              </Link>
              <Button className="margin-buttons" onClick={onRefresh}>
                <Icon type="sync" />
                Refresh
              </Button>
              <Upload {...propsUpload}>
                <Button type="primary" className="margin-buttons">
                  <Icon type="cloud-upload" />
                  Upload Dapp
                </Button>
              </Upload>
            </span>
          }
        >
          <Table columns={columns} dataSource={dappUploads} size="small" loading={loadingIpfs} pagination={false} />
        </Card>
      </Col>
      <Col span={10}>
        <Card
          title={
            <h3>
              DApp Information
              <Tag color={color} size="small" style={{ marginLeft: '10px' }}>
                {data && data.phase}
              </Tag>
            </h3>
          }
          size="small"
        >
          <Skeleton paragraph={{ rows: 5 }} active loading={loading}>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="DApp Name">{data && data.name}</Descriptions.Item>
              <Descriptions.Item label="Category">{data && data.category}</Descriptions.Item>
              <Descriptions.Item label="IP Local">{data && data.IpLocal}</Descriptions.Item>
              <Descriptions.Item label="IP Public">{data && data.IpPublic}</Descriptions.Item>
              <Descriptions.Item label="Created At">{data && moment(data.dappCreated).format('DD MMM YYYY')}</Descriptions.Item>
              <Descriptions.Item label="Description">{data && data.description}</Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  )
}

export default DappsUpload
