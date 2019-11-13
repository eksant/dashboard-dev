import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Form, PageHeader, Icon, Input, Checkbox, Button, Alert, Steps, Descriptions } from 'antd'

import logo from '../../assets/logo.svg'

const { Step } = Steps

const registerPage = props => {
  const { form, data, loading, error, steps, current, onNext, onPrev, onSubmit } = props
  const { getFieldDecorator } = form

  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFields((err, values) => {
      if (!err) {
        switch (current) {
          case 2:
            onSubmit(data)
            break
          default:
            onNext(values)
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
              <Steps size="small" current={current}>
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>

              {steps[current].content === 'NewAccount' && (
                <Fragment>
                  <Form.Item>
                    {getFieldDecorator('email', {
                      initialValue: data && data.email,
                      rules: [{ required: true, message: 'Please input Your email!' }],
                    })(<Input placeholder="Email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('passphare', {
                      initialValue: data && data.passphare,
                      rules: [{ required: true, message: 'Please input Your password!' }],
                    })(<Input placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('confPassphare', {
                      initialValue: data && data.confPassphare,
                      rules: [{ required: true, message: 'Please input Your confirm password!' }],
                    })(<Input placeholder="Confirm Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                </Fragment>
              )}

              {steps[current].content === 'RecoveryHint' && (
                <Fragment>
                  <Form.Item label="Use some word recovery phrase to recovery your password">
                    {getFieldDecorator('hint', {
                      initialValue: data && data.hint,
                      rules: [{ required: true, message: 'Please input some word hint!' }],
                    })(<Input placeholder="Hint" prefix={<Icon type="highlight" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                  </Form.Item>
                </Fragment>
              )}

              {steps[current].content === 'Register' && (
                <Descriptions size="small" column={1} bordered>
                  <Descriptions.Item label="Email">{data && data.email}</Descriptions.Item>
                  <Descriptions.Item label="Password">
                    <span>{data && data.passphare ? data.passphare.replace(/[!@#$%^&*()-/a-zA-Z0-9]/gi, '*') : ''}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Hint">{data && data.hint}</Descriptions.Item>
                </Descriptions>
              )}

              <Form.Item>
                {getFieldDecorator('agreement', {
                  valuePropName: 'checked',
                  initialValue: data && data.agreement,
                  rules: [{ required: true, message: 'You must agree to the terms and condition!' }],
                })(
                  <Checkbox>
                    <small>I have read and agreed to the Terms of Service & Privacy Policy.</small>
                  </Checkbox>
                )}
              </Form.Item>

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

                {current === steps.length - 1 && (
                  <Button type="primary" htmlType="submit" loading={loading} className="login-button-left">
                    Register
                  </Button>
                )}

                {current > 0 && (
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

export default Form.create()(registerPage)
