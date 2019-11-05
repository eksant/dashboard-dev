import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { setNewAuth, postLogin } from '../../redux/actions'
import { LoginPage } from '../../pages'

class LoginLayout extends PureComponent {
  componentDidMount = () => {
    this.props.setNewAuth()
  }

  onSubmit = val => {
    this.props
      .postLogin(val)
      .then(result => {
        if (result.success) {
          notification['success']({
            message: 'Login',
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
    return <LoginPage {...this.props} loading={loading} error={error} message={message} onSubmit={this.onSubmit.bind(this)} />
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setNewAuth, postLogin }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginLayout)
