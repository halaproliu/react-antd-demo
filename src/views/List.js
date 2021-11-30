import React, { Component } from 'react'
import { List, Avatar } from 'antd'
import qs from 'qs'

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
    let opts = {
        "chainOfBusDates": [
            {
                "jobIds": [
                    2058798,
                    2058797,
                    2058796,
                    2058683,
                    2060049
                ],
                "startBusDate": "2021-11-28",
                "endBusDate": "2021-11-29"
            }
        ],
        "executeType": 1,
        "instanceStatus": [],
        "runStartTime": "2021-11-29 00:00:00",
        "runEndTime": "2021-11-29 20:14:07"
    }
    console.log(window)
    let res = qs.stringify(opts, { arrayFormat: 'repeat' })
    console.log(res)
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
