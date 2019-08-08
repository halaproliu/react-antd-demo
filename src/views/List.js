import React, { Component } from 'react'
import { List, Avatar } from 'antd'

class MyList extends Component {
  state = {
    data: [{
      id: 1,
      name: 'David'
    }, {
      id: 2,
      name: 'Stephan'
    }, {
      id: 3,
      name: 'Alan'
    }, {
      id: 1,
      name: 'Lucy'
    }]
  }
  render() {
    return (
      <List dataSource={this.state.data}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.name}</a>}
              description="halapro.liu@gmail.com"
            />
            <div>content</div>
          </List.Item>
        )}>
      </List>
    )
  }
}

export default MyList
