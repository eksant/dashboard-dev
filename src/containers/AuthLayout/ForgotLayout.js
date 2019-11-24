import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { setNewAuth, setAuth, postForgot, postReset } from '../../redux/actions'
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

class ForgotLayout extends PureComponent {
  state = { current: 0 }

  componentDidMount = () => {
    this.props.setNewAuth()
  }

  onForgotPassword = val => {
    this.props.postForgot(val).then(result => {
      if (result.success) {
        const current = this.state.current + 1
        this.setState({ current })
      }
    })
  }

  onResetPassword = val => {
    this.props.postReset(val).then(result => {
      if (result.success) {
        notification['success']({
          message: 'Reset Password',
          description: result.message,
        })

        const current = this.state.current + 1
        this.setState({ current })
      }
    })
  }

  onPrev = () => {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const { current } = this.state
    const { loading, error, message, data } = this.props.auth
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

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setNewAuth, setAuth, postForgot, postReset }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotLayout)
