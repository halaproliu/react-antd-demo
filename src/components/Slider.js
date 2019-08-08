import React, { Component } from 'react'
import { Slider } from 'antd'

class MySlider extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  state = {
    value: ''
  }
  onChange(value) {
    this.props.onChange(value, this.props.type)
  }

  render() {
    return (
      <div className="flex" style={this.props.style}>
        <span>{this.props.title}</span><Slider style={{ width: 300 }} defaultValue={0} allowClear onChange={this.onChange}></Slider>
      </div>
    )
  }
}

export default MySlider
