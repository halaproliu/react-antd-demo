import React, { Component } from 'react'
import ReactJson from 'react-json-view'

import { THEME, ICON_STYLE, STATUS_LIST } from '@/constant'
import { MySelect } from '@/components'
import { parseStr2Json } from 'utils/common'
import { Input } from 'antd'
const { TextArea } = Input

class JsonView extends Component {
  state = {
    jsonObject: {}, // 格式化后的json对象
    jsonValue: '', // 输入的json字符串
    isError: false, // 是否显示错误提示
    theme: 'rjv-default', // 主题
    iconStyle: 'circle', // 图标样式
    isEnableEdit: 0, // 是否可以编辑
    isShowDataTypes: 0, // 是否显示数据类型
    isEnableClipboard: 0, // 是否支持剪贴板
    isShowObjectSize: 0 // 是否显示对象或数组size
  }

  constructor(props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onTextAreaChange = this.onTextAreaChange.bind(this)
    this.onEnableChange = this.onEnableChange.bind(this)
  }

  onChange(type, value) {
    this.setState({
      [type]: value
    })
  }

  onEnableChange(type, value) {
    this.setState({
      [type]: value
    })
  }

  onTextAreaChange(e) {
    let value = e.target.value
    try {
      let jsonObject = parseStr2Json(value)
      this.setState({
        isError: false,
        jsonValue: value,
        jsonObject: jsonObject
      })
    } catch (e) {
      this.setState({
        isError: true,
        jsonValue: value,
        jsonObject: {}
      })
    }
  }

  onEdit(edit) {
    if (this.isEnableEdit === 1) return
    this.setState({
      jsonObject: edit.updated_src
    })
  }
  render() {
    const { theme, iconStyle, jsonObject, jsonValue, isEnableEdit, isShowDataTypes, isEnableClipboard, isShowObjectSize } = this.state
    return (
      <div>
        <TextArea value={jsonValue} placeholder="Enter the json object" autosize={{ minRows: 4 }} onChange={this.onTextAreaChange} />
        {this.state.isError ? <p style={{ marginTop: 20, color: 'red' }}>请输入正确的json字符串</p> : null}
        {isEnableEdit === 0
          ? <ReactJson
              style={{ marginTop: 40 }}
              src={jsonObject}
              theme={theme}
              iconStyle={iconStyle}
              displayDataTypes={isShowDataTypes === 0}
              enableClipboard={isEnableClipboard === 0}
              displayObjectSize={isShowObjectSize === 0}
              onEdit={this.onEdit}
            />
          : <ReactJson
              style={{ marginTop: 40 }}
              src={jsonObject}
              theme={theme}
              iconStyle={iconStyle}
              displayDataTypes={isShowDataTypes === 0}
              enableClipboard={isEnableClipboard === 0}
              displayObjectSize={isShowObjectSize === 0}
            />}
        <div className="flex" style={{ marginTop: 40 }}>
          <MySelect title="主题：" type="theme" options={THEME} defaultValue={theme} onChange={this.onChange} />
          <MySelect title="图标样式：" type="iconStyle" options={ICON_STYLE} defaultValue={iconStyle} onChange={this.onChange} style={{ marginLeft: 30 }} />
        </div>
        <div className="flex" style={{ marginTop: 40 }}>
          <MySelect title="是否可以编辑：" type="isEnableEdit" options={STATUS_LIST} defaultValue={isEnableEdit} onChange={this.onEnableChange} />
          <MySelect title="是否显示数据类型：" type="isShowDataTypes" options={STATUS_LIST} defaultValue={isShowDataTypes} onChange={this.onEnableChange} style={{ marginLeft: 30 }} />
        </div>
        <div className="flex" style={{ marginTop: 40 }}>
          <MySelect title="是否支持剪贴板：" type="isEnableClipboard" options={STATUS_LIST} defaultValue={isEnableClipboard} onChange={this.onEnableChange} />
          <MySelect title="是否显示对象或数组size：" type="isShowObjectSize" options={STATUS_LIST} defaultValue={isShowObjectSize} onChange={this.onEnableChange} style={{ marginLeft: 30 }} />
        </div>
      </div>
    )
  }
}

export default JsonView
