import React, { Component } from 'react'
import { Layout } from 'antd'
import { Main, Siderbar } from '../components'
// import logo from '../logo.svg'
// const { Header } = Layout

class Container extends Component {
  render() {
    return (
      <Layout>
        <Siderbar></Siderbar>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }} className="header-bottom">
            <h3 style={{ float: 'right', marginRight: '20px' }}>halapro.liu</h3>
          </Header> */}
          <Main></Main>
        </Layout>
      </Layout>
    )
  }
}

export default Container
