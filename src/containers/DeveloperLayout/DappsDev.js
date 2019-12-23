import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { basePath, api } from '../../utils'
import { DappsList, DappsForm, DappsUpload } from '../../pages'
import { setNewDapp, getDapps, getDappById, createDapp, updateDapp, deleteDapp } from '../../redux/actions'

class DappsDev extends PureComponent {
  state = { current: 0 }

  componentDidMount() {
    const { page } = this.props
    if (page === 'new') {
      this.onPageNew()
    } else if (page === 'upload') {
      this.onPageUpload()
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

  onPageUpload = async () => {
    await this.props.getDappById(this.props.match.params.id)
  }

  onBack = async () => {
    const { history, path } = this.props
    await history.push(basePath(path))
  }

  onSkipDapp = () => {
    const current = this.state.current + 1
    this.setState({ current })
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

  onUploadDapp = (useStep = true) => {
    const { data } = this.props.dapps
    if (data) {
      return {
        name: 'file',
        multiple: false,
        accept: '.zip,.rar',
        showUploadList: useStep,
        customRequest: ({ onSuccess, onError, file }) => {
          api
            .uploadDapp('ipfs/adddir', file)
            .then(files => {
              const file = Array.isArray(files) ? files[0] : files
              if (file.status === 'success') {
                onSuccess(file)
                const payload = { ipfs_hash: file.data.hash }
                this.props
                  .updateDapp(data.id, payload)
                  .then(resp => {
                    const { success, message } = resp
                    notification[success ? 'success' : 'warning']({
                      message: 'Application Message',
                      description: success ? 'Success to upload DApp' : message,
                      style: { top: '30px' },
                    })

                    if (success) {
                      if (useStep) {
                        const current = this.state.current + 1
                        this.setState({ current })
                      } else {
                        this.onPageUpload()
                      }
                    }
                  })
                  .catch(error => {
                    console.error(error)
                  })
              } else {
                onError(file)
              }
            })
            .catch(error => onError(error))
        },
      }
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
    ) : page === 'upload' ? (
      <DappsUpload
        {...this.props}
        data={data}
        error={error}
        loading={loading}
        message={message}
        onRefresh={this.onPageUpload.bind(this)}
        onUploadDapp={this.onUploadDapp.bind(this)}
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
        onSkipDapp={this.onSkipDapp.bind(this)}
        onUploadDapp={this.onUploadDapp.bind(this)}
        onCreateDapp={values => this.onCreateDapp(values)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { dapps: state.dapps }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setNewDapp, getDapps, getDappById, createDapp, updateDapp, deleteDapp }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DappsDev)
