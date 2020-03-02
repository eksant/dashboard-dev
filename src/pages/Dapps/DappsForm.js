import React from 'react'
import { Card, Button, Input, Form, Select, Skeleton, Alert, Row, Col, Upload, Icon } from 'antd'

import { layoutButtonRight, layoutFormFull } from '../../utils'

const layoutForm = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const layoutUpload = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 17 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
}

const DappsForm = ({
  form,
  page,
  data,
  title,
  error,
  onBack,
  loading,
  message,
  skeleton,
  fileList,
  loadingLogo,
  onUploadLogo,
  onSubmitDapp,
}) => {
  const { getFieldDecorator } = form

  const onSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmitDapp(values)
      }
    })
  }

  return (
    <Card title={title}>
      <Form onSubmit={onSubmit}>
        {error && message && <Alert description={message} type="error" showIcon closable />}

        <Row>
          <Skeleton paragraph={{ rows: 3 }} active loading={skeleton}>
            <Col span={4}>
              <Form.Item {...layoutUpload}>
                {getFieldDecorator('fileList', {
                  initialValue: data && data.fileList,
                  rules: [{ required: false, message: 'Please upload!' }],
                })(
                  <Upload {...onUploadLogo()}>
                    {(fileList && fileList.length < 1) || (fileList.length > 0 && !fileList[0].url) ? (
                      <div>
                        <Icon type={loadingLogo ? 'loading' : 'cloud-upload'} />
                        <div className="ant-upload-text">Upload</div>
                      </div>
                    ) : (
                      <img src={fileList[0].url} alt="avatar" style={{ width: '100%' }} />
                    )}
                  </Upload>
                )}
              </Form.Item>
            </Col>

            <Col span={20}>
              <Row>
                <Col span={12}>
                  <Form.Item label="Dapp Name" {...layoutForm}>
                    {getFieldDecorator('podName', {
                      initialValue: data && data.name,
                      rules: [{ required: true, message: 'Please input dapp name!' }],
                    })(<Input placeholder="Input dapp name.." disabled={data ? true : false} />)}
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Category" {...layoutForm}>
                    {getFieldDecorator('category', {
                      initialValue: data && data.category,
                      rules: [{ required: true, message: 'Please select one!' }],
                    })(
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select one.."
                        optionFilterProp="children"
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      >
                        <Select.Option key="High-Rish">High-Rish</Select.Option>
                        <Select.Option key="Game">Game</Select.Option>
                        <Select.Option key="Gambling">Gambling</Select.Option>
                        <Select.Option key="Exchange">Exchange</Select.Option>
                        <Select.Option key="Finance">Finance</Select.Option>
                        <Select.Option key="Social">Social</Select.Option>
                        <Select.Option key="Art">Art</Select.Option>
                        <Select.Option key="Tools">Tools</Select.Option>
                        <Select.Option key="Others">Others</Select.Option>
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Description" {...layoutFormFull}>
                {getFieldDecorator('description', {
                  initialValue: data && data.description,
                  rules: [{ required: false, message: 'Please input description!' }],
                })(<Input.TextArea rows={4} placeholder="Input description.." />)}
              </Form.Item>
            </Col>
          </Skeleton>
        </Row>

        <Form.Item {...layoutButtonRight} style={{ textAlign: 'right' }}>
          <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
            {page === 'new' ? 'Create DApp' : 'Update DApp'}
          </Button>
          <Button className="margin-buttons" onClick={onBack}>
            Back To List
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Form.create()(DappsForm)
