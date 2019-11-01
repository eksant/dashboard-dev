import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { postRegister } from '../../redux/actions'
import { RegisterPage } from '../../pages'

class RegisterLayout extends PureComponent {
  onSubmit = val => {
    this.props
      .postRegister(val)
      .then(result => {
        if (result.success) {
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
    const { loading, error, message } = this.props.auth
    return <RegisterPage {...this.props} loading={loading} error={error} message={message} onSubmit={this.onSubmit.bind(this)} />
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ postRegister }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterLayout)
