import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

const { Item, SubMenu } = Menu
const { Sider } = Layout

class LayoutSide extends PureComponent {
  render() {
    const { sides, menuOpenKeys, menuSelecteds, onChangeMenu, onSelectMenu } = this.props

    return (
      <Sider width={200} className="side-admin">
        <Menu
          theme="light"
          mode="inline"
          openKeys={menuOpenKeys}
          selectedKeys={menuSelecteds}
          onSelect={onSelectMenu}
          onOpenChange={onChangeMenu}
        >
          {sides &&
            sides.map(r => {
              return !r.childs ? (
                <Item key={r.path}>
                  <Link to={r.path}>
                    <Icon type={r.icon} />
                    <span>{r.name}</span>
                  </Link>
                </Item>
              ) : (
                <SubMenu
                  key={r.path}
                  title={
                    <span>
                      <Icon type={r.icon} />
                      <span>{r.name}</span>
                    </span>
                  }
                >
                  {r.childs &&
                    r.childs.map(c => (
                      <Item key={`${r.path}${c.path}`}>
                        <Link to={`${r.path}${c.path}`}>
                          <Icon type={c.icon} />
                          <span>{c.name}</span>
                        </Link>
                      </Item>
                    ))}
                </SubMenu>
              )
            })}
        </Menu>
      </Sider>
    )
  }
}

export default LayoutSide
