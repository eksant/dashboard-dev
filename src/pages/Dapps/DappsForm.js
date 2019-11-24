import React from 'react'
import { Card, Form, Skeleton, Input, Radio, Row, Col, Button } from 'antd'

import PageError from '../PageError'
import { layoutForm, layoutButton } from '../../utils'

const DappsForm = props => {
  const { title, form } = props
  const { getFieldDecorator } = form
  const { skeleton, loading, error, message, data } = props

  const onSubmit = e => {
    e.preventDefault()
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        props.onSubmitData(values)
      }
    })
  }

  return (
    <Card title={<h3>{title}</h3>} size="small">
      {error ? (
        <PageError message={message} />
      ) : (
        <Skeleton active title={false} paragraph={{ rows: 5 }} size="small" loading={skeleton}>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col span={12}>
                <Form.Item label="Host Name" {...layoutForm}>
                  {getFieldDecorator('hostname', {
                    initialValue: data && data.hostname,
                    rules: [{ required: true, message: 'Please input  hostname!' }],
                  })(<Input placeholder="Input category hostname.." />)}
                </Form.Item>
                <Form.Item label="Status" {...layoutForm}>
                  {getFieldDecorator('status', {
                    initialValue: data && data.status,
                    rules: [{ required: true, message: 'Please choose status!' }],
                  })(
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Domain Name" {...layoutForm}>
                  {getFieldDecorator('domainname', {
                    initialValue: data && data.domainname,
                    rules: [{ required: false, message: 'Please input domainname!' }],
                  })(<Input placeholder="Input category domainname.." />)}
                </Form.Item>
              </Col>
            </Row>

            <Form.Item {...layoutButton}>
              <Button loading={loading} disabled={loading || error} type="primary" htmlType="submit">
                Save
              </Button>
              <Button className="margin-buttons" onClick={props.onBack}>
                Back
              </Button>
            </Form.Item>
          </Form>
        </Skeleton>
      )}
    </Card>
  )
}

export default Form.create()(DappsForm)
