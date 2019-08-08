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

  // 上传图片并显示图片
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
  // 滤镜效果
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

  cssImageToPureImage(url) {
    const filter = Object.values(this.state.filterObj).join(' ')
    const filterValue = `filter:${filter}`
    let img = new Image()
    img.onload = () => {
      img.setAttribute('style', filterValue)
      let filterImg = new Image()
      filterImg.onload = () => {
        let svgImg = new Image()
        svgImg.onload = () => {
          let canvas = document.createElement('canvas')
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0)
          this.downloadImage(canvas.toDataURL('image/png'))
        }
        svgImg.src = `data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><foreignObject><body xmlns="http://www.w3.org/1999/xhtml">${new XMLSerializer().serializeToString(filterImg).replace(/#/g, '%23').replace(/\n/g, '%0A')}</body></foreignObject></svg>`
      }
      filterImg.src = img.src
    }
    img.src = url
  }
  downloadImage(img) {
    let a = document.createElement('a')
    a.href = img
    a.download = '滤镜图片'
    a.click()
  }
  render() {
    let uploadImg
    const { img } = this.state
    if (img) {
      if (!this.isEmptyObj(this.state.filterObj)) {
        const filter = Object.values(this.state.filterObj).join(' ')
        const filterValue = { filter: filter }
        uploadImg = (<Card style={{ width: 300 }} cover={<img src={img} alt="" style={filterValue} />} bodyStyle={{ display: 'none' }} />)
      } else {
        uploadImg = (<Card style={{ width: 300 }} cover={<img src={img} alt="" />} bodyStyle={{ display: 'none' }} />)
      }
    }
    return (
      <div>
        {uploadImg}
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
        <Button style={{ marginTop: 20 }} onClick={this.cssImageToPureImage.bind(this, img)}>生成图片</Button>
      </div>
    )
  }
}

export default MyUpload
