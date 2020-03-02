import React from 'react'
import moment from 'moment'
import { Card, Row, Col, Button, Icon, Descriptions, Tag, Skeleton, Upload, Avatar } from 'antd'

import PageError from '../PageError'

const DappsUpload = ({ title, skeleton, loading, error, message, data, onBack, onUploadDapp }) => {
  const color = data ? (data.dappStatus === 'Publish' ? 'blue' : data.dappStatus === 'Pending' ? 'orange' : 'green') : null

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
              <Button className="margin-buttons" onClick={onBack}>
                <Icon type="left-circle" />
                Back
              </Button>
            </span>
          }
        >
          <Upload.Dragger style={{ width: '100%' }} {...onUploadDapp()} disabled={loading}>
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">Click or drag zip file (.zip) to this area to upload</p>
            <p className="ant-upload-hint">
              Upload DApp taken around 1 - 2 minutes, please enjoy coffee while waiting for the process to finish.
            </p>
          </Upload.Dragger>
        </Card>
      </Col>

      <Col span={10}>
        <Card
          title={
            <h3>
              DApp Information
              <Tag color={color} size="small" style={{ marginLeft: '10px' }}>
                {data && data.dappStatus}
              </Tag>
            </h3>
          }
          size="small"
        >
          <Skeleton paragraph={{ rows: 5 }} active loading={skeleton}>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Logo">
                <Avatar shape="square" size={64} src={data && data.logoUrl} />
              </Descriptions.Item>
              <Descriptions.Item label="DApp Name">{data && data.name}</Descriptions.Item>
              <Descriptions.Item label="Category">{data && data.category}</Descriptions.Item>
              <Descriptions.Item label="IP Public">
                {data && data.ipPublic ? (
                  <a href={data.ipPublic} target="_blank" rel="noopener noreferrer">
                    {data.ipPublic}
                  </a>
                ) : (
                  'waiting..'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Gun DB">
                {data && data.gunDb ? (
                  <a href={data.gunDb} target="_blank" rel="noopener noreferrer">
                    {data.gunDb}
                  </a>
                ) : (
                  'waiting..'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">{data && moment(data.dappCreated).format('DD MMM YYYY hh:mm:ss')}</Descriptions.Item>
              <Descriptions.Item label="Description">{data && data.description}</Descriptions.Item>
            </Descriptions>
          </Skeleton>
        </Card>
      </Col>
    </Row>
  )
}

export default DappsUpload
