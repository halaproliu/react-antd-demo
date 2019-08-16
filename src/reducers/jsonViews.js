const initialState = {
  theme: 'rjv-default', // 主题
  iconStyle: 'circle', // 图标样式
  isEnableEdit: 0, // 是否可以编辑
  isShowDataTypes: 0, // 是否显示数据类型
  isEnableClipboard: 0, // 是否支持剪贴板
  isShowObjectSize: 0 // 是否显示对象或数组size
}
const jsonViews = (state = initialState, { type, key, value }) => {
  switch (type) {
    case 'TOGGLE_STATE':
      const tempState = { ...state }
      console.log('ddddd:', value)
      tempState[key] = value
      return {
        ...state,
        ...tempState
      }
    default:
      return state
  }
}

export default jsonViews
