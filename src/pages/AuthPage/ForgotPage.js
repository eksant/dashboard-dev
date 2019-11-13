import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, PageHeader, Icon, Input, Button, Alert, Steps, Result } from 'antd'

import logo from '../../assets/logo.svg'

const { Step } = Steps

const forgotPage = props => {
  const { form, data, loading, error, steps, current, onForgotPassword, onPrev, onResetPassword } = props
  const { getFieldDecorator } = form

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        switch (current) {
          case 0:
            onForgotPassword(values)
            break
          case 1:
            data.newPassphare = values.newPassphare
            onResetPassword(data)
            break
          default:
            break
        }
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
            <span className="right-menu-label">Remember password?</span>
            <Button ghost href="/login">
              Back To Log In
            </Button>
          </div>,
        ]}
      >
        <Col xs={{ span: 12, offset: 5 }} lg={{ span: 24, offset: 9 }} className="login">
          <Card title={<h3>Forgot Password</h3>} className="login-card">
            <Form onSubmit={handleSubmit}>
              <Steps size="small" current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>

              {steps[current].content === 'Account' && (
                <Fragment>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      initialValue: data && data.email,
                      rules: [{ required: true, message: 'Please input Your email!' }],
                    })(<Input placeholder="Email" type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                  <Form.Item label="Your word recovery hint to reset password">
                    {getFieldDecorator('hint', {
                      initialValue: data && data.hint,
                      rules: [{ required: true, message: 'Please input recovery hint!' }],
                    })(<Input placeholder="Hint" prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                </Fragment>
              )}

              {steps[current].content === 'ResetPassword' && (
                <Fragment>
                  <Form.Item label="Temp password">
                    {getFieldDecorator('oldPassphare', {
                      initialValue: data && data.oldPassphare,
                      rules: [{ required: true, message: 'Please input temp password!' }],
                    })(<Input placeholder="Temp Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} disabled />)}
                  </Form.Item>
                  <Form.Item label="New password">
                    {getFieldDecorator('newPassphare', {
                      initialValue: data && data.newPassphare,
                      rules: [{ required: true, message: 'Please input new password!' }],
                    })(
                      <Input
                        placeholder="New Password"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      />
                    )}
                  </Form.Item>
                </Fragment>
              )}

              {steps[current].content === 'Done' && (
                <Result
                  status="success"
                  title="Reset password successfully!"
                  extra={[
                    <Button type="primary" key="login" href="/login">
                      Go To Log In
                    </Button>,
                  ]}
                />
              )}

              {error && props.message && <Alert message="Error" description={props.message} type="error" closable />}

              <Form.Item>
                {current < steps.length - 1 && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className={current > 0 ? 'login-button-left' : 'login-form-button'}
                  >
                    Next
                  </Button>
                )}

                {current > 0 && current < 2 && (
                  <Button style={{ marginLeft: 8 }} className="login-button-right" onClick={onPrev}>
                    Previous
                  </Button>
                )}
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </PageHeader>
    </Row>
  )
}

export default Form.create()(forgotPage)
