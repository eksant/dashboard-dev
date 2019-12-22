import React from 'react'
import { Card, Steps, Button, Input, Form, Select, Skeleton, Alert, Row, Col, Upload, Icon, Result, Spin } from 'antd'

import { layoutForm, layoutButtonRight, layoutFormFull } from '../../utils'

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

const DappsForm = props => {
  const { form } = props
  const { getFieldDecorator } = form
  const { skeleton, loading, error, message, current, data } = props
  const { onSkipDapp, onCreateDapp, onUploadDapp } = props
  const propsUpload = onUploadDapp()

  const onSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        switch (current) {
          case 0:
            onCreateDapp(values)
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
        <Steps current={current} style={{ marginBottom: '20px' }}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>

        {error && message && <Alert description={message} type="error" showIcon closable />}

        <Row style={{ marginTop: '20px' }}>
          <Skeleton paragraph={{ rows: 2 }} active loading={skeleton}>
            {steps[current].content === 'Detail' ? (
              <Spin size="large" spinning={loading} tip="Please wait, DApp configuration takes 20-35 seconds...">
                <Col span={12}>
                  <Form.Item label="Dapp Name" {...layoutForm}>
                    {getFieldDecorator('pod_name', {
                      initialValue: data && data.pod_name,
                      rules: [{ required: true, message: 'Please input dapp name!' }],
                    })(<Input placeholder="Input dapp name.." />)}
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
              <Dragger {...propsUpload} style={{ marginBottom: '20px' }}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag compress file to this area to upload</p>
                <p className="ant-upload-hint">
                  Just support for a compress file. Please compressing file (zip or rar) before to upload Your DApp.
                </p>
              </Dragger>
            ) : (
              <Result
                status="success"
                title="Successfully Created DApp!"
                subTitle="DApp already deploy in node Pfalfa."
              />
            )}
          </Skeleton>
        </Row>

        <Form.Item {...layoutButtonRight} style={{ textAlign: 'right', marginTop: '10px' }}>
          {current < steps.length - 1 && (
            <Button loading={loading} disabled={loading} type="primary" htmlType="submit">
              {current === 0 ? 'Create Dapp' : 'Skip / Next'}
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
