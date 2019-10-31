import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { postLogin } from '../../redux/actions'
import { LoginPage } from '../../pages'

class AuthLayout extends PureComponent {
  onSubmit = val => {
    this.props
      .postLogin(val)
      .then(async result => {
        const { t } = this.props
        const { message, success } = result
        if (success) {
          window.location.href = '/'
        } else {
          notification['warning']({
            message: 'Invalid Login',
            description: t(message),
          })
        }
      })
      .catch(err => console.error(err))
  }

  render() {
    return <LoginPage {...this.props} onSubmit={this.onSubmit.bind(this)} />
  }
}

const mapStateToProps = state => {
  return { auth: state.auth, general: state.general }
}

const mapDispatchToProps = dispatch => bindActionCreators({ postLogin }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLayout)
