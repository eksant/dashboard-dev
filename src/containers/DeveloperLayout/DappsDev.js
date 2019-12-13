import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { notification } from 'antd'

import { basePath } from '../../utils'
import { DappsList, DappsForm } from '../../pages'
import { setNewDapp, getDapps, getDappById, createDapp, deleteDapp } from '../../redux/actions'

class DappsDev extends PureComponent {
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

  onSubmitData = async payload => {
    if (payload) {
      const { data } = this.props.product
      const item = {
        ...payload,
        imgUrl:
          payload.imgUrl && typeof payload.imgUrl === 'string'
            ? payload.imgUrl
            : payload.imgUrl.fileList.length > 0
            ? payload.imgUrl.fileList[0].url
            : null,
      }

      if (item.priceActual && item.priceSell && parseFloat(item.priceActual) > parseFloat(item.priceSell)) {
        notification['warning']({
          message: 'Application Message',
          description: 'Price sell must be greater than cost of goods sold',
          style: { top: '30px' },
        })
        return
      }

      if (!data) {
        this.props.createProduct(item).then(resp => {
          notification[resp.success ? 'success' : 'warning']({
            message: 'Application Message',
            description: resp.message,
            style: { top: '30px' },
          })
          if (resp.success) {
            this.onBack()
          }
        })
      } else {
        const id = data._id
        this.props.updateProduct(id, item).then(resp => {
          notification[resp && resp.success ? 'success' : 'warning']({
            message: 'Application Message',
            description: resp && resp.message,
            style: { top: '30px' },
          })

          if (resp.success) {
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
        loading={loading}
        message={message}
        skeleton={skeleton}
        onBack={this.onBack.bind(this)}
        onSubmitData={values => this.onSubmitData(values)}
      />
    )
  }
}

const mapStateToProps = state => {
  return { dapps: state.dapps }
}

const mapDispatchToProps = dispatch => bindActionCreators({ setNewDapp, getDapps, getDappById, createDapp, deleteDapp }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DappsDev)
