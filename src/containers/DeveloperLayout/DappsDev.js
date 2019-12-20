import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import config from '../../config'
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

  onUploadDapp = () => {
    return {
      name: 'file',
      multiple: true,
      action: `${config.api.dapps}/ipfs/add`,
      // action: 'http://206.189.32.43:8081',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      // headers: { 'Content-Type': 'multipart/form-data;' },
      // headers: { authorization: 'authorization-text', 'content-type': 'multipart/form-data; boundary=ebf9f03029db4c2799ae16b5428b06bd' },
      onChange(info) {
        const { status } = info.file
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }

        if (status === 'done') {
          notification['warning']({
            message: 'Application Message',
            description: `${info.file.name} file uploaded successfully.`,
            style: { top: '30px' },
          })

          // const current = this.state.current + 1
          // this.setState({ current })
        } else if (status === 'error') {
          notification['warning']({
            message: 'Application Message',
            description: `${info.file.name} file upload failed.`,
            style: { top: '30px' },
          })
        }
      },
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

const mapDispatchToProps = dispatch => bindActionCreators({ setNewDapp, getDapps, getDappById, createDapp, deleteDapp }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DappsDev)