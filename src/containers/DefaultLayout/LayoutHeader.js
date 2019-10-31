import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Layout, Menu, Icon, Avatar, Row, Col } from 'antd';

import { store, decrypt, parseObject } from '../../utils';
// import { getPublicGeneral } from '../../redux/general/actions';

const { Header } = Layout;
const { SubMenu } = Menu;
const userOg = require('../../assets/user-default.png');
// const logoOg = require('../../assets/logo-default.png');
const flagUs = require('../../assets/flag-us.png');
const flagId = require('../../assets/flag-id.png');
const flagFr = require('../../assets/flag-fr.png');

class LayoutHeader extends PureComponent {
  state = { flag: flagUs };

  async componentDidMount() {
    await this.setState({ flag: this.getFlag(store.get('lang')) });
    // const flag = this.getFlag(store.get('lang'));
    // const user = parseObject(decrypt(store.get('user-access')));
    // await this.setState({ flag, user });
    // await this.props.getPublicGeneral();
  }

  getFlag(lng) {
    return lng === 'en' ? flagUs : lng === 'fr' ? flagFr : flagId;
  }

  async onChangeLang(e) {
    const lng = e.item.props.eventKey;
    await store.set('lang', lng);
    await this.setState({ flag: this.getFlag(lng) });
    await this.props.i18n.changeLanguage(lng);
  }

  onLogout = async () => {
    await store.remove('user-access');
    await store.remove('token-access');
    await store.remove('token-expired');
    window.location.href = '/';
  };

  render() {
    const { flag, user } = this.state;
    const { t, general } = this.props;
    // const logoUrl = general && general.logoUrl ? general.logoUrl : logoOg;
    console.log('==general', general);

    return (
      <div className="default-header">
        <Header>
          <Row>
            <Col span={4} className="menu-left">
              {/* {general && general} */}
            </Col>

            <Col span={20} className="menu-right">
              <Menu selectedKeys={[]} mode="horizontal">
                {!store.get('token-access') ? (
                  <Menu.Item key="login">
                    <Link to="/login">
                      <Icon type="login" />
                      {t('Login or Register')}
                    </Link>
                  </Menu.Item>
                ) : (
                  <SubMenu
                    title={
                      <span className="submenu-title-wrapper">
                        <Avatar size="small" src={userOg} style={{ marginRight: '5px' }} />
                        {user && user.fullName}
                      </span>
                    }
                  >
                    <Menu.Item key="logout" onClick={this.onLogout.bind(this)}>
                      <Icon type="logout" />
                      {t('Logout')}
                    </Menu.Item>
                  </SubMenu>
                )}

                <SubMenu
                  title={
                    <span className="submenu-title-wrapper">
                      <Avatar shape="square" size={18} src={flag} />
                    </span>
                  }
                >
                  <Menu.Item key="id" onClick={this.onChangeLang.bind(this)}>
                    <Avatar shape="square" size={18} src={flagId} style={{ marginRight: '10px' }} />
                    Indonesia
                  </Menu.Item>
                  <Menu.Item key="en" onClick={this.onChangeLang.bind(this)}>
                    <Avatar shape="square" size={18} src={flagUs} style={{ marginRight: '10px' }} />
                    English
                  </Menu.Item>
                  <Menu.Item key="fr" onClick={this.onChangeLang.bind(this)}>
                    <Avatar shape="square" size={18} src={flagFr} style={{ marginRight: '10px' }} />
                    France
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
      </div>
    );
  }
}

export default LayoutHeader;
// const mapStateToProps = state => {
//   return { general: state.general };
// };

// const mapDispatchToProps = dispatch => bindActionCreators({ getPublicGeneral }, dispatch);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(LayoutHeader);
