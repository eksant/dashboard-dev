import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout, Menu, Icon, Avatar, Row, Col } from 'antd'

import { getAuthUser, postLogout } from '../../redux/actions'

const { Header } = Layout
const { SubMenu } = Menu
const userOg = require('../../assets/user-default.png')
const logoUrl = require('../../assets/logo-pfalfa.svg')

class LayoutHeader extends PureComponent {
  componentDidMount = async () => {
    await this.props.getAuthUser()
  }

  onLogout = async () => {
    await this.props.postLogout()
    window.location.href = '/'
  }

  render() {
    const { data } = this.props.auth

    return (
      <div className="header-admin">
        <Header>
          <Row>
            <Col span={6} className="menu-left">
              <div className="logo-box">
                <img alt="logo" src={logoUrl} className="logo" />{' '}
              </div>
            </Col>

            <Col span={18} className="menu-right">
              <Menu selectedKeys={[]} mode="horizontal">
                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Avatar size="small" src={userOg} style={{ marginRight: '5px' }} />
                      {data && data.alias}
                    </span>
                  }
                >
                  <Menu.Item key="logout" onClick={this.onLogout.bind(this)}>
                    <Icon type="logout" />
                    Logout
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { auth: state.auth }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getAuthUser, postLogout }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutHeader)
