import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { basePath, api } from '../../utils'
import { DappsList, DappsForm, DappsUpload } from '../../pages'
import { setNewDapp, getDapps, getDappById, createDapp, updateDapp, deleteDapp, getIpfsByHash } from '../../redux/actions'

class DappsDev extends PureComponent {
  state = {
    current: 0,
    fileList: [],
    loadingLogo: false,
  }

  componentDidMount() {
    const { page } = this.props
    if (page === 'new') {
      this.onPageNew()
    } else if (page === 'edit') {
      this.onPageEdit()
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

  onPageEdit = async () => {
    await this.props.getDappById(this.props.match.params.id)
  }

  onPageUpload = async () => {
    const params = queryString.parse(this.props.location.search)
    await this.props.getDappById(params.id)
    if (params.ipfs) {
      await this.props.getIpfsByHash(params.ipfs)
    }
  }

  onBack = async () => {
    const { history, path } = this.props
    await history.push(basePath(path))
  }

  onSkipDapp = () => {
    const current = this.state.current + 1
    this.setState({ current })
  }

  onUploadLogo = () => {
    return {
      name: 'file',
      multiple: false,
      accept: 'image/*',
      showUploadList: false,
      listType: 'picture-card',
      className: 'avatar-uploader',
      fileList: this.state.fileList,
      customRequest: ({ onSuccess, onError, file }) => {
        this.setState({ loadingLogo: true })
        api
          .uploadS3('upload/s3', file)
          .then(resp => {
            const { success, message, data } = resp
            const fileList = [
              {
                uid: '-1',
                name: 'fileList.png',
                status: success ? 'done' : 'error',
                url: data,
              },
            ]

            onSuccess(fileList)
            this.setState({ loadingLogo: false, fileList })

            if (!success) {
              onError(fileList)
              notification['warning']({
                message: 'Application Message',
                description: message,
                style: { top: '30px' },
              })
            }
          })
          .catch(error => onError(error))
      },
    }
  }

  onUploadDapp = (useStep = true) => {
    const { path, dapps } = this.props
    const { data } = dapps

    if (data) {
      const dataId = data.id

      return {
        name: 'file',
        multiple: false,
        accept: '.zip',
        showUploadList: useStep,
        customRequest: ({ onSuccess, onError, file }) => {
          api
            .uploadDapp('ipfs/upload', file)
            .then(resp => {
              const { success, message, data } = resp
              const fileList = [
                {
                  uid: '-1',
                  name: 'fileList.zip',
                  status: success ? 'done' : 'error',
                  url: data.hash,
                },
              ]

              if (success) {
                onSuccess(fileList)
                const payload = { ipfsHash: data.hash }
                this.props
                  .updateDapp(dataId, payload)
                  .then(resp => {
                    const { success } = resp
                    notification[success ? 'success' : 'warning']({
                      message: 'Application Message',
                      description: message,
                      style: { top: '30px' },
                    })

                    if (success) {
                      if (useStep) {
                        const current = this.state.current + 1
                        this.setState({ current })
                      } else {
                        window.location.href = `${path}?id=${dataId}&ipfs=${payload.ipfsHash}`
                      }
                    }
                  })
                  .catch(error => {
                    console.error(error)
                  })
              } else {
                onError(fileList)
              }

              // const file = Array.isArray(files) ? files[0] : files
              // if (file.status === 'success') {
              //   onSuccess(file)
              //   const payload = { ipfsHash: file.data.hash }
              //   this.props
              //     .updateDapp(data.id, payload)
              //     .then(resp => {
              //       const { success, message } = resp
              //       notification[success ? 'success' : 'warning']({
              //         message: 'Application Message',
              //         description: success ? 'Success to upload DApp' : message,
              //         style: { top: '30px' },
              //       })

              //       if (success) {
              //         this.props.getIpfsByHash(payload.ipfsHash)

              //         if (useStep) {
              //           const current = this.state.current + 1
              //           this.setState({ current })
              //         } else {
              //           this.onPageUpload()
              //         }
              //       }
              //     })
              //     .catch(error => {
              //       console.error(error)
              //     })
              // } else {
              //   onError(file)
              // }
            })
            .catch(error => console.error(error))
        },
      }
    }
  }

  onGetDetailIpfs = async hash => {
    if (hash) {
      const { data } = this.props.ipfs
      const params = queryString.parse(this.props.location.search)
      const prev = params.ipfs !== hash ? data.Hash : null
      this.props.getIpfsByHash(hash, prev)
    }
  }

  onSubmitDapp = async payload => {
    if (payload) {
      const { data } = this.props.dapps
      const { fileList } = this.state
      payload.logoUrl = fileList.length > 0 ? fileList[0].url : data ? payload.fileList[0].url : null

      if (!data) {
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
      } else {
        this.props.updateDapp(data.id, payload).then(resp => {
          const { success, message } = resp

          notification[success ? 'success' : 'warning']({
            message: 'Application Message',
            description: message,
            style: { top: '30px' },
          })

          if (success) {
            this.onBack()
          }
        })
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
    const { page, dapps, ipfs } = this.props
    const { current, loadingLogo, fileList } = this.state
    const { skeleton, loading, error, message, data, datas, paginate } = dapps

    const logos =
      fileList.length > 0
        ? fileList
        : [
            {
              uid: '-1',
              name: 'fileList.png',
              status: 'done',
              url: data && data.logoUrl,
            },
          ]

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
        dataIpfs={ipfs.data}
        datasIpfs={ipfs.datas}
        errorIpfs={ipfs.error}
        loadingIpfs={ipfs.loading}
        messageIpfs={ipfs.message}
        onBack={this.onBack.bind(this)}
        onRefresh={this.onPageUpload.bind(this)}
        onUploadDapp={this.onUploadDapp.bind(this)}
        onGetDetailIpfs={val => this.onGetDetailIpfs(val)}
      />
    ) : (
      <DappsForm
        {...this.props}
        data={data}
        error={error}
        fileList={logos}
        current={current}
        loading={loading}
        message={message}
        skeleton={skeleton}
        loadingLogo={loadingLogo}
        onBack={this.onBack.bind(this)}
        onSkipDapp={this.onSkipDapp.bind(this)}
        onUploadLogo={this.onUploadLogo.bind(this)}
        onUploadDapp={this.onUploadDapp.bind(this)}
        onSubmitDapp={values => this.onSubmitDapp(values)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { dapps: state.dapps, ipfs: state.ipfs }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setNewDapp, getDapps, getDappById, createDapp, updateDapp, deleteDapp, getIpfsByHash }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DappsDev)
