import React, { PureComponent } from 'react'

import { Dashboard } from '../../pages'
import { store, decrypt } from '../../utils'

export default class DashboardDev extends PureComponent {
  state = { loading: false, data: null }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = async () => {
    this.setState({ loading: true })
    const email = await decrypt(store.get('email'))
    const pubkey = await decrypt(store.get('pubkey'))
    const data = { email, pubkey }
    this.setState({ loading: false, data })
  }

  render() {
    const { loading, data } = this.state
    return <Dashboard {...this.props} loading={loading} data={data} onRefresh={_ => this.onRefresh()} />
  }
}
