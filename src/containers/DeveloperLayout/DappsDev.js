import React, { PureComponent } from 'react'
import queryString from 'query-string'
import { notification } from 'antd'

import { basePath, api } from '../../utils'
import { DappsList, DappsForm, DappsUpload } from '../../pages'

export default class DappsDev extends PureComponent {
  state = {
    fileList: [],
    fileListLoading: false,

    listData: [],
    listError: false,
    listMessage: null,
    listLoading: false,

    formData: null,
    formError: false,
    formMessage: null,
    formLoading: false,
    formSkeleton: false,

    uploadData: null,
    uploadError: false,
    uploadMessage: null,
    uploadLoading: false,
    uploadSkeleton: false,
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

  onRefresh = () => {
    this.setState({ listLoading: true })
    api
      .get('dapps')
      .then(({ success, message, data }) => {
        if (success) {
          const datas = data.map((item, idx) => {
            item.key = idx + 1
            return item
          })
          this.setState({ listData: datas })
        } else {
          this.setState({ listError: true, listMessage: message })
        }
      })
      .finally(_ => this.setState({ listLoading: false }))
      .catch(error => console.error(error.message))
  }

  onPageNew = async () => {
    await this.setState({ formSkeleton: true, formData: null })
    await this.setState({ formSkeleton: false })
  }

  onPageEdit = async () => {
    await this.setState({ formSkeleton: true })
    api
      .get(`dapps/${this.props.match.params.id}`)
      .then(({ success, message, data }) => {
        if (success) {
          const fileList = [{ uid: '-1', name: 'fileList.png', status: 'done', url: data && data.logoUrl }]
          this.setState({ formData: data, fileList })
        } else {
          this.setState({ formError: true, formMessage: message })
        }
      })
      .finally(_ => this.setState({ formSkeleton: false }))
      .catch(error => console.error(error.message))
  }

  onPageUpload = async () => {
    const params = queryString.parse(this.props.location.search)
    await this.setState({ uploadSkeleton: true })
    api
      .get(`dapps/${params.id}`)
      .then(({ success, message, data }) => {
        if (success) {
          const fileList = [{ uid: '-1', name: 'fileList.png', status: 'done', url: data && data.logoUrl }]
          this.setState({ uploadData: data, fileList })
        } else {
          this.setState({ uploadError: true, uploadMessage: message })
        }
      })
      .finally(_ => this.setState({ uploadSkeleton: false }))
      .catch(error => console.error(error.message))
  }

  onBack = async () => {
    const { history, path } = this.props
    await history.push(basePath(path))
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

  onUploadDapp = () => {
    const { uploadData } = this.state
    if (uploadData) {
      return {
        name: 'file',
        multiple: false,
        accept: '.zip',
        customRequest: ({ onSuccess, onError, file }) => {
          this.setState({ uploadLoading: true })
          api
            .uploadDapp(`ipfs/upload/${uploadData.id}`, file)
            .then(({ success, message, data }) => {
              notification[success ? 'success' : 'warning']({
                message: 'My DApps',
                description: message,
                style: { top: '30px' },
              })

              const fileList = [
                {
                  uid: '-1',
                  name: 'fileList.zip',
                  status: success ? 'done' : 'error',
                  url: success ? data.Attributes.ipfsUrl : null,
                },
              ]

              if (success) {
                onSuccess(fileList)
                this.onBack()
              } else {
                onError(fileList)
              }
            })
            .finally(_ => this.setState({ uploadLoading: false }))
            .catch(error => console.error(error.message))
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

  onSubmitDapp = async value => {
    if (value) {
      const { fileList, formData } = this.state
      value.logoUrl = fileList.length > 0 ? fileList[0].url : formData ? value.fileList[0].url : null

      if (!formData) {
        await this.setState({ formLoading: true })
        api
          .post('dapps', value)
          .then(({ success, message }) => {
            if (success) {
              notification['success']({
                message: 'My DApps',
                description: message,
                style: { top: '30px' },
              })

              this.onBack()
            } else {
              this.setState({ error: true, message })
            }
          })
          .finally(_ => this.setState({ formLoading: false }))
          .catch(error => console.error(error.message))
      } else {
        await this.setState({ formLoading: true })
        api
          .put(`dapps/${formData.id}`, value)
          .then(({ success, message }) => {
            if (success) {
              notification['success']({
                message: 'My DApps',
                description: message,
                style: { top: '30px' },
              })

              this.onBack()
            } else {
              this.setState({ error: true, message })
            }
          })
          .finally(_ => this.setState({ formLoading: false }))
          .catch(error => console.error(error.message))
      }
    }
  }

  onDeleteData = async id => {
    if (id) {
      this.setState({ listLoading: true })
      api
        .del(`dapps/${id}`)
        .then(({ success, message }) => {
          notification[success ? 'success' : 'warning']({
            message: 'My DApps',
            description: message,
            style: { top: '30px' },
          })

          if (success) this.onRefresh()
        })
        .finally(_ => this.setState({ listLoading: false }))
        .catch(error => console.error(error.message))
    }
  }

  render() {
    const { page } = this.props
    const { fileListLoading, fileList } = this.state
    const { listLoading, listError, listMessage, listData } = this.state
    const { formSkeleton, formLoading, formError, formMessage, formData } = this.state
    const { uploadSkeleton, uploadLoading, uploadError, uploadMessage, uploadData } = this.state

    return page === 'list' ? (
      <DappsList
        {...this.props}
        datas={listData}
        error={listError}
        loading={listLoading}
        message={listMessage}
        onRefresh={_ => this.onRefresh()}
        onDeleteData={val => this.onDeleteData(val)}
      />
    ) : page === 'upload' ? (
      <DappsUpload
        {...this.props}
        data={uploadData}
        error={uploadError}
        loading={uploadLoading}
        message={uploadMessage}
        skeleton={uploadSkeleton}
        onBack={_ => this.onBack()}
        onUploadDapp={val => this.onUploadDapp(val)}
      />
    ) : (
      <DappsForm
        {...this.props}
        data={formData}
        error={formError}
        fileList={fileList}
        loading={formLoading}
        message={formMessage}
        skeleton={formSkeleton}
        onBack={_ => this.onBack()}
        loadingLogo={fileListLoading}
        onUploadLogo={_ => this.onUploadLogo()}
        onSubmitDapp={val => this.onSubmitDapp(val)}
      />
    )
  }
}
