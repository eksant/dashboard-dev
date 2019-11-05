import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, Icon, Input, Button, Alert } from 'antd'

const registerPage = props => {
  const { form, loading, error, onSubmit } = props
  const { getFieldDecorator } = form

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  return (
    <Row justify="center" className="login-background">
      <Col xs={{ span: 12, offset: 6 }} lg={{ span: 24, offset: 9 }} className="login">
        <Card title={<h3>Register New Account</h3>} className="login-card">
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              {getFieldDecorator('alias', {
                initialValue: null,
                rules: [{ required: true, message: 'Please input Your email!' }],
              })(<Input placeholder="Email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('passphare', {
                initialValue: null,
                rules: [{ required: true, message: 'Please input Your passphare!' }],
              })(<Input placeholder="Passphare" prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
            </Form.Item>

            {error && props.message && <Alert message="Error" description={props.message} type="error" closable />}

            <Form.Item>
              <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
                Register
              </Button>

              <Link to="/login">Back To Login</Link>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Form.create()(registerPage)
