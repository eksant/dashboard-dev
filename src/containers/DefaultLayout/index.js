import React, { PureComponent, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import sides from '../../sides'
import routes from '../../routes'
import LayoutSide from './LayoutSide'
import LayoutHeader from './LayoutHeader'
import LayoutBreadcrumb from './LayoutBreadcrumb'
import { TopBarProgress } from '../../components'
import { store, pathName, pathNames, isArray, decrypt } from '../../utils'

const Page404 = React.lazy(() => import('../../pages/Page404'))
const { Content } = Layout

export default class DefaultLayout extends PureComponent {
  _isMounted = false

  state = {
    data: null,
    error: false,
    loading: false,
    menuOpenKeys: [],
    menuSelecteds: [],
    breadcrumbKeys: [],
  }

  componentDidMount = async () => {
    this._isMounted = true

    this.setDefaultState()
    await this.setState({ loading: true })
    const email = decrypt(store.get('email'))
    const pubkey = decrypt(store.get('pubkey'))
    this.setState({ loading: false, data: { email, pubkey } })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  setDefaultState = async () => {
    const path = await pathName()

    if (this._isMounted) {
      await this.setState({
        menuOpenKeys: await pathNames(),
        menuSelecteds: path ? [path] : [],
      })
      await this.setBreadcrumb()
    }
  }

  setBreadcrumb = async () => {
    let breadcrumbKeys = []
    const { menuOpenKeys } = this.state

    if (isArray(menuOpenKeys)) {
      const firstOpenKey = menuOpenKeys[0]
      const lastOpenKey = menuOpenKeys[menuOpenKeys.length - 1]

      sides.forEach(r => {
        if (r.path === firstOpenKey) {
          breadcrumbKeys.push({ name: r.name, icon: r.icon, path: r.path, childs: r.childs })
        }

        if (lastOpenKey && r.childs && menuOpenKeys.length > 1) {
          const childs = r.childs.filter(f => f.path === lastOpenKey)
          if (childs.length > 0) {
            const c = isArray(childs) ? childs[0] : childs
            breadcrumbKeys.push({ name: c.name, icon: c.icon, path: c.path })
          }
        }
      })
    }

    await this.setState({ breadcrumbKeys })
  }

  getSideMenu = () => {
    return sides.filter(item => item.roles.indexOf('Developer') > -1)
  }

  onChangeMenu = async menuKeys => {
    await this.setState({ menuOpenKeys: [menuKeys.pop()] })
  }

  onSelectMenu = async value => {
    const menuOpenKeys = pathNames(value.key)
    const menuSelecteds = value.selectedKeys ? value.selectedKeys : value.keyPath

    await this.setState({ menuOpenKeys, menuSelecteds })
    await this.setBreadcrumb()
  }

  render() {
    const { loading, error, data, menuOpenKeys, menuSelecteds, breadcrumbKeys } = this.state

    return (
      <Layout className="default-layout">
        <LayoutHeader {...this.props} />
        <LayoutSide
          {...this.props}
          sides={this.getSideMenu()}
          menuOpenKeys={menuOpenKeys}
          menuSelecteds={menuSelecteds}
          onChangeMenu={this.onChangeMenu.bind(this)}
          onSelectMenu={this.onSelectMenu.bind(this)}
        />
        <Layout className="container-admin">
          <LayoutBreadcrumb {...this.props} breadcrumbKeys={breadcrumbKeys} onSelectMenu={val => this.onSelectMenu(val)} />
          <Content className="content-admin">
            <Suspense fallback={<TopBarProgress />}>
              <Switch>
                {routes &&
                  routes.map(route =>
                    route.component && route.roles.indexOf('Developer') > -1 ? (
                      <Route
                        exact
                        key={route.path}
                        path={route.path}
                        render={props => <route.component {...this.props} {...props} {...route} auth={data} />}
                      />
                    ) : null
                  )}
                <Route exact path="*" render={props => <Page404 {...this.props} {...props} />} />
              </Switch>
              {!loading && !error && !data && !store.get('pubkey') && <Redirect from="/" to="/login" noThrow />}
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
