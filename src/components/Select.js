import React, { Component } from 'react'
import { isPlainObject } from 'utils/common'
import { Select } from 'antd'
const { Option } = Select

class MySelect extends Component {
  static defaultProps = {
    defaultValue: ''
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
    let optionEl
    if (isPlainObject) {
      optionEl = (
        options.map(({ key, value }, index) => (
          <Option value={key} key={index}>{value}</Option>
        ))
      )
    } else {
      optionEl = (
        options.map((value, index) => (
          <Option value={value} key={index}>{value}</Option>
        ))
      )
    }
    return (
      <div className="flex" style={style}>
        <span>{title}</span>
        <Select defaultValue={defaultValue} style={{ width: 240 }} onChange={this.onChange}>
          {optionEl}
        </Select>
      </div>
    )
  }
}

export default MySelect
