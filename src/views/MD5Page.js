import React, { useState } from 'react'
import { Input } from 'antd'
import CryptoJS from 'crypto-js'

const { TextArea } = Input

function MD5Page() {
  const [text, setText] = useState('')
  const [aesText, setAesText] = useState('')
  const onChange = (e) => {
    const value = e.target.value || ''
    const md5Text = CryptoJS.MD5(value).toString()
    const aesText = CryptoJS.AES.encrypt(value, 'password').toString()
    setText(md5Text)
    setAesText(aesText)
  }
  return (
    <div>
      <TextArea rows={4} onChange={onChange}></TextArea>
      <div style={{ marginTop: '20px'}}>MD5加密文本：{text}</div>
      <div style={{ marginTop: '20px'}}>AES加密文本：{aesText}</div>
    </div>
  )
}

export default MD5Page