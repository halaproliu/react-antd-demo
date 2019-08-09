import React, { Component } from 'react'
import { Select } from 'antd'
const { Option } = Select

class MySelect extends Component {
  static defaultProps = {
    defaultValue: ''
  }
  state = {

  }

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.props.onChange(this.props.type, value)
  }

  render() {
    const { title, defaultValue, options, style } = this.props
    return (
      <div className="flex" style={style}>
        <span>{title}</span>
        <Select defaultValue={defaultValue} style={{ width: 240 }} onChange={this.onChange}>
          {
            options.map((value, index) => (
              <Option value={value} key={index}>{value}</Option>
            ))
          }
        </Select>
      </div>
    )
  }
}

export default MySelect
