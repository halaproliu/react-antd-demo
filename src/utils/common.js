// 获取uuid
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

// 是否是空对象
function isEmptyObj(obj) {
  return Object.keys(obj).length === 0
}

// 判断数据类型
function isType(obj, type) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`
}

// 是否是纯object
function isPlainObject(obj) {
  return isType(obj, 'Object')
}

// 是否是数组
function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj)
  } else {
    return isType(obj, 'Array')
  }
}

// 转换不规范的json字符串为规范的格式
function processJsonString(value) {
  if (!value) return ''
  value = value.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '"$1":') // 为没有引号的key值添加双引号
  value = value.replace(/'/g, '"') // 转换单引号为双引号
  value = value.replace(/\s*/g, '') // 去除所有空格
  return value
}

export { guid, isEmptyObj, isType, isPlainObject, isArray, processJsonString }
