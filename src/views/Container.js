import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link, Route } from 'react-router-dom'
import routes from '../routes'
// import logo from '../logo.svg'
const { Sider, Header, Content } = Layout

class Container extends Component {
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
      <Layout>
        <Sider
          className="left-menu"
          breakpoint="lg"
          collapsedWidth="0"
          // onBreakpoint={broken => {
          //   console.log(broken);
          // }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          {/* <img src={logo} className="App-logo" alt="logo" style={{ width: 100 }} /> */}
          <Menu mode="inline" defaultSelectedKeys={[this.state.selectedKey]} style={{ height: '100%' }}>
            <Menu.Item key="index">
              <Link to="/">
                <Icon type="user" />
                <span className="nav-text">卡片</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="list">
              <Link to="/list">
                <Icon type="video-camera" />
                <span className="nav-text">列表</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="imageProcess">
              <Link to="/imageProcess">
                <Icon type="upload" />
                <span className="nav-text">图片处理</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} className="header-bottom">
            <h3 style={{ float: 'right', marginRight: '20px' }}>halapro.liu</h3>
          </Header>
          <Content style={{ background: '#fff' }}>
            <div style={{ padding: 24, minHeight: 360 }}>
              {
                routes.map((route, index) => (
                  <Route key={index} exact={route.exact} path={route.path} component={route.component}></Route>
                ))
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default Container
