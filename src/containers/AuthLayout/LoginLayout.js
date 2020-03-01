import React, { PureComponent } from 'react'
import { notification } from 'antd'

import { LoginPage } from '../../pages'
import { api, store, encrypt } from '../../utils'

export default class LoginLayout extends PureComponent {
  state = { loading: false, error: false, message: null }

  componentDidMount = () => {
    this.onRefresh()
  }

  onRefresh = () => {
    this.setState({ loading: false, error: false, message: null })
  }

  onSubmit = async val => {
    const { email, passphare, remember } = val
    this.setState({ loading: true })

    if (remember) {
      await store.set('email', encrypt(email))
      await store.set('passphare', encrypt(passphare))
    } else {
      await store.remove('email')
      await store.remove('passphare')
    }

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
  }

  render() {
    const { loading, error, message } = this.state
    return <LoginPage {...this.props} loading={loading} error={error} message={message} onSubmit={val => this.onSubmit(val)} />
  }
}
