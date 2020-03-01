import React, { PureComponent } from 'react'
import { notification } from 'antd'

import { RegisterPage } from '../../pages'
import { api, store, encrypt } from '../../utils'

export default class RegisterLayout extends PureComponent {
  state = { loading: false, error: false, message: null }

  componentDidMount = () => {
    this.onRefresh()
  }

  onRefresh = () => {
    this.setState({ loading: false, error: false, message: null })
  }

  onSubmit = val => {
    const { email, hint, passphare, confPassphare } = val

    this.setState({ loading: true })
    if (passphare !== confPassphare) {
      this.setState({ loading: false, error: true, message: 'Confirm password not the same' })
    } else {
      api
        .post('auth/register', { email, passphare, hint }, false)
        .then(({ success, message }) => {
          if (success) {
            api
              .post('auth/login', { email, passphare }, false)
              .then(async ({ success, message, data }) => {
                if (success) {
                  await store.set('pubkey', encrypt(data.pub))
                  notification['success']({
                    message: 'Login',
                    description: message,
                  })

                  setTimeout(() => {
                    window.location.href = '/'
                  }, 1000)
                } else {
                  this.setState({ error: true, message })
                }
              })
              .finally(_ => this.setState({ loading: false }))
              .catch(error => console.error(error.message))
          } else {
            this.setState({ error: true, message })
          }
        })
        .finally(_ => this.setState({ loading: false }))
        .catch(error => console.error(error.message))
    }

    // this.props
    //   .postRegister(val)
    //   .then(result => {
    //     if (!result.error) {
    //       notification['success']({
    //         message: 'Register New Account',
    //         description: result.message,
    //       })

    //       setTimeout(() => {
    //         window.location.href = '/'
    //       }, 1000)
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }

  render() {
    const { loading, error, message } = this.state
    return <RegisterPage {...this.props} error={error} loading={loading} message={message} onSubmit={val => this.onSubmit(val)} />
  }
}
