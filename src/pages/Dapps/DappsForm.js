import React from 'react'
import { Card, Steps, Button, Input, Form, Select, Skeleton, Alert, Row, Col, Upload, Icon, Result, Spin } from 'antd'

import { layoutButtonRight, layoutFormFull } from '../../utils'

const { Dragger } = Upload
const { Step } = Steps
const steps = [
  {
    title: 'DApp Info',
    content: 'Detail',
  },
  {
    title: 'Upload DApp',
    content: 'Upload',
  },
  {
    title: 'Done',
    content: 'Done',
  },
]

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

const DappsForm = props => {
  const { form, page } = props
  const { getFieldDecorator } = form
  const { onSkipDapp, onSubmitDapp, onUploadDapp, onUploadLogo } = props
  const { skeleton, loading, error, message, current, data, loadingLogo, fileList } = props

  const onSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        switch (current) {
          case 0:
            onSubmitDapp(values)
            break
          case 1:
            onSkipDapp()
            break
          default:
            break
        }
      }
    })
  }

  return (
    <Card>
      <Form onSubmit={onSubmit}>
        {page === 'new' && (
          <Steps current={current} style={{ marginBottom: '20px' }}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
        )}

        {error && message && <Alert description={message} type="error" showIcon closable />}

        <Row style={{ marginTop: '20px' }}>
          <Skeleton paragraph={{ rows: 2 }} active loading={skeleton}>
            {steps[current].content === 'Detail' ? (
              <Spin size="large" spinning={loading} tip="Please wait, DApp process configuration...">
                <Col span={18}>
                  <Form.Item label="Dapp Name" {...layoutForm}>
                    {getFieldDecorator('podName', {
                      initialValue: data && data.name,
                      rules: [{ required: true, message: 'Please input dapp name!' }],
                    })(<Input placeholder="Input dapp name.." disabled={data ? true : false} />)}
                  </Form.Item>
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
                <Col span={6}>
                  <Form.Item label="Logo" {...layoutUpload}>
                    {getFieldDecorator('fileList', {
                      initialValue: fileList,
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

                <Col span={24}>
                  <Form.Item label="Description" {...layoutFormFull}>
                    {getFieldDecorator('description', {
                      initialValue: data && data.description,
                      rules: [{ required: false, message: 'Please input description!' }],
                    })(<Input.TextArea rows={6} placeholder="Input description.." />)}
                  </Form.Item>
                </Col>
              </Spin>
            ) : steps[current].content === 'Upload' ? (
              <Dragger {...onUploadDapp()} style={{ marginBottom: '20px' }}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag compress file to this area to upload</p>
                <p className="ant-upload-hint">
                  Just support for a compress file. Please compressing file (zip or rar) before to upload Your DApp.
                </p>
              </Dragger>
            ) : (
              <Result status="success" title="Successfully Created DApp!" subTitle="DApp already deploy in node Pfalfa." />
            )}
          </Skeleton>
        </Row>

        <Form.Item {...layoutButtonRight} style={{ textAlign: 'right', marginTop: '10px' }}>
          {current < steps.length - 1 && (
            <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
              {current === 0 ? (page === 'new' ? 'Create DApp' : 'Update DApp') : 'Skip / Next'}
            </Button>
          )}
          <Button className="margin-buttons" onClick={props.onBack}>
            Back To List
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Form.create()(DappsForm)
