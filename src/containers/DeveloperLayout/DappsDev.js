import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { basePath } from '../../utils'
import { DappsList, DappsForm } from '../../pages'
import { setNewDapp, getDapps, getDappById, createDapp, deleteDapp } from '../../redux/actions'

class DappsDev extends PureComponent {
  state = { current: 0 }

  componentDidMount() {
    const { page } = this.props
    if (page === 'new') {
      this.onPageNew()
    } else {
      this.onRefresh()
    }
  }

  onRefresh = async () => {
    await this.props.getDapps()
  }

  onPageNew = async () => {
    await this.props.setNewDapp()
  }

  onPageEdit = async id => {
    await this.props.getDappById(id)
  }

  onBack = async () => {
    const { history, path } = this.props
    await history.push(basePath(path))
  }

  onCreateDapp = async payload => {
    if (payload) {
      this.props.createDapp(payload).then(resp => {
        const { success, message } = resp
        if (success) {
          notification['success']({
            message: 'Application Message',
            description: message,
            style: { top: '30px' },
          })

          const current = this.state.current + 1
          this.setState({ current })
        }
      })
    }
  }

  onDeleteData = async id => {
    if (id) {
      this.props.deleteDapp(id).then(resp => {
        notification[resp.success ? 'success' : 'warning']({
          message: 'Application Message',
          description: resp.message,
          style: { top: '30px' },
        })

        if (resp.success) {
          this.onRefresh()
        }
      })
    }
  }

  render() {
    const { current } = this.state
    const { dapps, page } = this.props
    const { skeleton, loading, error, message, data, datas, paginate } = dapps

    return page === 'list' ? (
      <DappsList
        {...this.props}
        error={error}
        datas={datas}
        loading={loading}
        message={message}
        paginate={paginate}
        onRefresh={this.onRefresh.bind(this)}
        onDeleteData={id => this.onDeleteData(id)}
      />
    ) : (
      <DappsForm
        {...this.props}
        data={data}
        error={error}
        current={current}
        loading={loading}
        message={message}
        skeleton={skeleton}
        onBack={this.onBack.bind(this)}
        onCreateDapp={values => this.onCreateDapp(values)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { dapps: state.dapps }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setNewDapp, getDapps, getDappById, createDapp, deleteDapp }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DappsDev)
