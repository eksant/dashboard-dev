import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, PageHeader, Icon, Input, Button, Alert, Checkbox } from 'antd'

import logo from '../../assets/logo.svg'
import { store, decrypt } from '../../utils'

const LoginPage = props => {
  const { form, loading, error, onSubmit } = props
  const { getFieldDecorator } = form
  const email = decrypt(store.get('email'))
  const passphare = decrypt(store.get('passphare'))

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
            <span className="right-menu-label">Don't have a account?</span>
            <Button ghost href="/register">
              Register New Account
            </Button>
          </div>,
        ]}
      >
        <Col xs={{ span: 12, offset: 6 }} lg={{ span: 24, offset: 9 }} className="login">
          <Card title={<h3>Welcome Back!</h3>} className="login-card">
            <Form onSubmit={handleSubmit}>
              <Form.Item>
                {getFieldDecorator('email', {
                  initialValue: email,
                  rules: [{ required: true, message: 'Please input Your email!' }],
                })(<Input placeholder="Email" type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('passphare', {
                  initialValue: passphare,
                  rules: [{ required: true, message: 'Please input Your password!' }],
                })(
                  <Input.Password
                    placeholder="Password"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )}
              </Form.Item>

              {error && <Alert message="Error" description={props.message} type="error" closable />}

              <Form.Item>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}

                <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
                  Log in
                </Button>

                <Link to="/forgot">Forgot Password?</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </PageHeader>
    </Row>
  )
}

export default Form.create()(LoginPage)
