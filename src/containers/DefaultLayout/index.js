import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import { store, parseObject, decrypt } from '../../utils'
// import { getPublicGeneral } from '../../redux/actions'

// import AdminLayout from '../AdminLayout'
// import PublicLayout from '../PublicLayout'
// import AuthLayout from '../AuthLayout'

class DefaultLayout extends PureComponent {
  componentDidMount() {
    // this.props.getPublicGeneral()
  }

  render() {
    return <div>HOME</div>
    // const { data } = this.props.general
    // const hasToken = store.get('token-access')
    // const user = parseObject(decrypt(store.get('user-access')))
    // const role = user ? user.role : null
    // return hasToken && (role === 'Admin' || role === 'Superadmin') ? (
    //   <AdminLayout {...this.props} general={data} user={user} />
    // ) : (
    //   <PublicLayout {...this.props} general={data} user={user} />
    // )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

// const mapDispatchToProps = dispatch => bindActionCreators({ getPublicGeneral }, dispatch)

export default connect(
  mapStateToProps,
  null //mapDispatchToProps
)(DefaultLayout)
