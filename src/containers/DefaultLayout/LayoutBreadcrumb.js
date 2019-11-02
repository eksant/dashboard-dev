import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon, Menu } from 'antd'

const { Item } = Menu

class LayoutBreadcrumb extends PureComponent {
  getSubMenus = (rootPath, childs) => {
    const { onSelectMenu } = this.props
    return childs && childs.length > 0 ? (
      <Menu>
        {childs.map(c => {
          const path = `${rootPath}${c.path}`
          return (
            <Item key={path} onClick={onSelectMenu}>
              <Link to={path}>{c.name}</Link>
            </Item>
          )
        })}
      </Menu>
    ) : null
  }

  render() {
    const { breadcrumbKeys } = this.props

    return (
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <Icon type="dashboard" />
          <span>Dashboard</span>
        </Breadcrumb.Item>

        {breadcrumbKeys &&
          breadcrumbKeys.map(b => {
            return b.childs ? (
              <Breadcrumb.Item href="#" key={`${b.path}${b.childs.path}`} overlay={this.getSubMenus(b.path, b.childs)}>
                <span>{b.name}</span>
              </Breadcrumb.Item>
            ) : b.path !== '/' ? (
              <Breadcrumb.Item key={b.path}>
                <span>{b.name}</span>
              </Breadcrumb.Item>
            ) : null
          })}
      </Breadcrumb>
    )
  }
}

export default LayoutBreadcrumb
