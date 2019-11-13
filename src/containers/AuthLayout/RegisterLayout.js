import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { setNewAuth, setAuth, postRegister } from '../../redux/actions'
import { RegisterPage } from '../../pages'

const steps = [
  {
    title: 'New Account',
    content: 'NewAccount',
  },
  {
    title: 'Recovery Hint',
    content: 'RecoveryHint',
  },
  {
    title: 'Register',
    content: 'Register',
  },
]

class RegisterLayout extends PureComponent {
  state = { current: 0 }

  componentDidMount = () => {
    this.props.setNewAuth()
  }

  onNext = val => {
    const { data } = this.props.auth
    const payload = {
      email: val && val.email ? val.email : data && data.email ? data.email : null,
      passphare: val && val.passphare ? val.passphare : data && data.passphare ? data.passphare : null,
      confPassphare: val && val.confPassphare ? val.confPassphare : data && data.confPassphare ? data.confPassphare : null,
      hint: val && val.hint ? val.hint : data && data.hint ? data.hint : null,
    }

    this.props.setAuth(payload)
    const current = this.state.current + 1
    this.setState({ current })
  }

  onPrev = () => {
    const current = this.state.current - 1
    this.setState({ current })
  }

  onSubmit = val => {
    console.log('==val', val)
    this.props
      .postRegister(val)
      .then(result => {
        if (!result.error) {
          notification['success']({
            message: 'Register New Account',
            description: result.message,
          })

          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { current } = this.state
    const { loading, error, message, data } = this.props.auth
    return (
      <RegisterPage
        {...this.props}
        data={data}
        steps={steps}
        error={error}
        loading={loading}
        message={message}
        current={current}
        onNext={val => this.onNext(val)}
        onPrev={this.onPrev.bind(this)}
        onSubmit={this.onSubmit.bind(this)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setNewAuth, setAuth, postRegister }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterLayout)
