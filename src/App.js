import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import Container from './views/Container'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Container />
      </HashRouter>
    )
  }
}

export default App
