import React, { Component } from 'react'
import { Upload, Card, Button, Icon } from 'antd'
import { MySlider } from '../components'

class MyUpload extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
  }
  state = {
    img: '',
    resultImg: '',
    fileList: [],
    filterObj: {}
  }

  onChange(info) {
    const { status } = info.file
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    const reader = new FileReader()
    reader.readAsDataURL(info.file.originFileObj)
    reader.onload = (e) => {
      this.setState({
        img: e.target.result
      })
    }
  }
  onSliderChange(value, type) {
    let unit = '%'
    switch (type) {
      case 'blur':
        unit = 'px'
        break
      case 'hue-rotate':
        unit = 'deg'
        break
      default:
        unit = '%'
    }
    value += unit
    const filterObj = this.state.filterObj
    filterObj[type] = `${type}(${value})`
    this.setState({
      filterObj: filterObj
    })
  }

  isEmptyObj(obj) {
    for (let key in obj) {
      return false
    }
    return true
  }

  createImage(url) {
    const src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="120" height="50">
    <body xmlns="http://www.w3.org/1999/xhtml">
    <img src="${url}" />
    </body>
    </foreignObject>
    </svg>`
    let img = new Image()
    img.onload = (e) => {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      const resultImg = canvas.toDataURL('image/png')
      this.setState({
        resultImg: resultImg
      })
    }
    img.src = src
  }
  render() {
    let uploadImg
    let resultImgObj
    const { img, resultImg } = this.state
    if (img) {
      if (!this.isEmptyObj(this.state.filterObj)) {
        const filter = Object.values(this.state.filterObj).join(' ')
        const filterValue = { filter: filter }
        uploadImg = (<Card style={{ width: 300 }} cover={<img src={img} alt="" style={filterValue} />} bodyStyle={{ display: 'none' }} />)
      } else {
        uploadImg = (<Card style={{ width: 300 }} cover={<img src={img} alt="" />} bodyStyle={{ display: 'none' }} />)
      }
    }
    // if (resultImg) {
    //   console.log(resultImg)
    //   resultImgObj = (<Card style={{ width: 300 }} cover={<img src={resultImg} alt="" />} bodyStyle={{ display: 'none' }} />)
    // }
    return (
      <div>
        {uploadImg}
        {resultImgObj}
        <Upload listType="picture" fileList={this.state.fileList} onChange={this.onChange} style={{ marginTop: 30, display: 'block' }}>
          <Button>
            <Icon type="upload" /> 上传图片
          </Button>
        </Upload>
        <div className="flex" style={{ marginTop: 40 }}>
          <MySlider title="模糊：" type="blur" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="亮度：" type="brightness" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="对比度：" type="contrast" onChange={this.onSliderChange}></MySlider>
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="灰度：" type="grayscale" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="透明度：" type="opacity" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="饱和度：" type="saturate" onChange={this.onSliderChange}></MySlider>
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="色相旋转：" type="hue-rotate" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="反转图像：" type="invert" onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="深褐色：" type="sepia" onChange={this.onSliderChange}></MySlider>
        </div>
        <Button style={{ marginTop: 20 }} onClick={this.createImage(img)}>生成图片</Button>
      </div>
    )
  }
}

export default MyUpload
