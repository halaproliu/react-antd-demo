import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import routes from '../routes'

const { Sider } = Layout

class Siderbar extends Component {
  state = { selectedKey: 'index' }
  componentWillMount() {
    let key = window.location.hash.slice(2)
    key = key || 'index'
    this.setState({
      selectedKey: key
    })
  }
  render() {
    return (
      <Sider
        className="left-menu"
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        {/* <img src={logo} className="App-logo" alt="logo" style={{ width: 100 }} /> */}
        <Menu mode="inline" defaultSelectedKeys={[this.state.selectedKey]} style={{ height: '100%' }}>
          {
            routes.map(route => (
              <Menu.Item key={route.menuKey}>
                <Link to={route.path}>
                  <Icon type={route.icon}></Icon>
                  <span className="nav-text">{route.title}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
    )
  }
}

export default Siderbar
