import React, { PureComponent } from 'react'
import { Layout, Menu, Icon, Avatar, Row, Col } from 'antd'

import { store, decrypt } from '../../utils'

const { SubMenu } = Menu
const { Header } = Layout
const userOg = require('../../assets/user-default.png')
const logoUrl = require('../../assets/logo-pfalfa.svg')

export default class LayoutHeader extends PureComponent {
  state = { data: null }

  componentDidMount = async () => {
    const email = decrypt(store.get('email'))
    const pubkey = decrypt(store.get('pubkey'))
    this.setState({ data: { email, pubkey } })
  }

  onLogout = async () => {
    await store.remove('pubkey')
    window.location.href = '/'
  }

  render() {
    const { data } = this.state

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
                      {data && data.email}
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
