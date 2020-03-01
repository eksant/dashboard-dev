import React, { PureComponent } from 'react'
import { notification } from 'antd'

import { api } from '../../utils'
import { ForgotPage } from '../../pages'

const steps = [
  {
    title: 'Account',
    content: 'Account',
  },
  {
    title: 'Reset Password',
    content: 'ResetPassword',
  },
  {
    title: 'Done',
    content: 'Done',
  },
]

export default class ForgotLayout extends PureComponent {
  state = {
    current: 0,
    error: false,
    message: null,
    loading: false,
    data: { email: null, hint: null, oldPassphare: null, newPassphare: null },
  }

  componentDidMount = () => {
    this.onRefresh()
  }

  onRefresh = () => {
    this.setState({
      current: 0,
      error: false,
      message: null,
      loading: false,
      data: { email: null, hint: null, oldPassphare: null, newPassphare: null },
    })
  }

  onForgotPassword = val => {
    const { email, hint } = val
    this.setState({ loading: true, data: { email, hint } })
    api
      .post('auth/forgot', { email, hint }, false)
      .then(({ success, message, data }) => {
        if (success) {
          const current = this.state.current + 1
          this.setState({ current, error: false, message: null, data: { ...this.state, oldPassphare: data } })
        } else {
          this.setState({ error: true, message })
        }
      })
      .finally(_ => this.setState({ loading: false }))
      .catch(error => console.error(error.message))
  }

  onResetPassword = val => {
    const { oldPassphare, newPassphare, data } = val
    const { email } = data
    this.setState({ loading: true })
    api
      .post('auth/reset', { email, oldPassphare, newPassphare }, false)
      .then(({ success, message }) => {
        if (success) {
          const current = this.state.current + 1
          this.setState({ current, error: false, message: null })

          notification['success']({
            message: 'Reset Password',
            description: message,
          })
        } else {
          this.setState({ error: true, message })
        }
      })
      .finally(_ => this.setState({ loading: false }))
      .catch(error => console.error(error.message))
  }

  onPrev = () => {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const { loading, error, message, data, current } = this.state
    return (
      <ForgotPage
        {...this.props}
        data={data}
        steps={steps}
        error={error}
        loading={loading}
        message={message}
        current={current}
        onPrev={this.onPrev.bind(this)}
        onResetPassword={val => this.onResetPassword(val)}
        onForgotPassword={val => this.onForgotPassword(val)}
      />
    )
  }
}
