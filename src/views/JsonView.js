import React, { Component } from 'react'
import ReactJson from 'react-json-view'
import { Select } from 'antd'
import { THEME, ICON_STYLE } from '@/constant'
import { MySelect } from '@/components'
const { Option } = Select

class JsonView extends Component {
  state = {
    jsonObject: {
      a: 1,
      b: 2
    },
    theme: 'rjv-default',
    iconStyle: 'circle'
  }

  constructor(props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(type, value) {
    this.setState({
      [type]: value
    })
  }

  onEdit(edit) {
    console.log(edit)
    this.setState({
      jsonObject: edit.updated_src
    })
  }
  render() {
    const { theme, iconStyle, jsonObject } = this.state
    return (
      <div>
        <ReactJson src={jsonObject} theme={theme} iconStyle={iconStyle} onEdit={this.onEdit}></ReactJson>
        <div className="flex" style={{ marginTop: 40 }}>
          <MySelect title="主题：" type="theme" options={THEME} defaultValue={theme} onChange={this.onChange}></MySelect>
          <MySelect title="图标样式：" type="iconStyle" options={ICON_STYLE} defaultValue={iconStyle} onChange={this.onChange} style={{ marginLeft: 30 }}></MySelect>
        </div>
      </div>
    )
  }
}

export default JsonView
