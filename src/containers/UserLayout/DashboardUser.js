import React, { PureComponent } from 'react'
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { Dashboard } from '../../pages'
// import { getDashboard } from '../../redux/actions';

class DashboardUser extends PureComponent {
  componentDidMount() {
    this.onRefresh()
  }

  onRefresh = async () => {
    // await this.props.getDashboard();
  }

  render() {
    const { auth } = this.props
    return <Dashboard {...this.props} auth={auth} onRefresh={this.onRefresh.bind(this)} />
  }
}

export default DashboardUser

// const mapStateToProps = state => {
//   return { dashboard: state.dashboard }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({ getDashboard }, dispatch)

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DashboardUser)
