import React, { Component } from 'react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'
import routes from '../routes'

const { Content } = Layout

class Main extends Component {
  render() {
    return (
      <Content style={{ background: '#fff' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          {
            routes.map((route, index) => (
              <Route key={index} exact={route.exact} path={route.path} component={route.component}></Route>
            ))
          }
        </div>
      </Content>
    )
  }
}

export default Main
