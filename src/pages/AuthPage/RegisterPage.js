import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, PageHeader, Icon, Input, Checkbox, Button, Alert } from 'antd'

import logo from '../../assets/logo.svg'

const registerPage = ({ form, loading, error, message, onSubmit }) => {
  const { getFieldDecorator } = form

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        onSubmit(values)
      }
    })
  }

  return (
    <Row justify="center" className="login-background">
      <PageHeader
        className="header"
        title={
          <div className="logo-box">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" /> Pfalfa
            </Link>
          </div>
        }
        extra={[
          <div key="login" className="right-menu-box">
            <span className="right-menu-label">Already have a account?</span>
            <Button ghost href="/login">
              Log In
            </Button>
          </div>,
        ]}
      >
        <Col xs={{ span: 12, offset: 5 }} lg={{ span: 24, offset: 9 }} className="login">
          <Card title={<h3>Register New Account</h3>} className="login-card">
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: null,
                  rules: [{ required: true, message: 'Please input Your email!' }],
                })(<Input placeholder="Email" type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('hint', {
                  initialValue: null,
                  rules: [{ required: true, message: 'Please input some word hint!' }],
                })(<Input placeholder="Recovery Hint" prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('passphare', {
                  initialValue: null,
                  rules: [{ required: true, message: 'Please input Your password!' }],
                })(
                  <Input.Password
                    placeholder="Password"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('confPassphare', {
                  initialValue: null,
                  rules: [{ required: true, message: 'Please input Your confirm password!' }],
                })(
                  <Input.Password
                    placeholder="Confirm Password"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  rules: [{ required: true, message: 'You must agree to the terms and condition!' }],
                })(
                  <Checkbox>
                    <small>I have read and agreed to the Terms of Service & Privacy Policy.</small>
                  </Checkbox>
                )}
              </Form.Item>

              {error && message && <Alert message="Error" description={message} type="error" closable />}

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} className="login-form-button">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </PageHeader>
    </Row>
  )
}

export default Form.create()(registerPage)
