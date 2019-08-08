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
    filterObj: {
      blur: 0,
      brightness: 0,
      contrast: 0,
      grayscale: 0,
      opacity: 0,
      saturate: 0,
      'hue-rotate': 0,
      invert: 0,
      sepia: 0
    }
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
    const filterObj = this.state.filterObj
    filterObj[type] = value
    this.setState({
      filterObj: filterObj
    })
  }

  packageFiter () {
    let arr = []
    Object.keys(this.state.filterObj).forEach(type => {
      switch (type) {
        case 'blur':
          this.state.filterObj[type] > 0 && arr.push(`${type}(${this.state.filterObj[type]}px)`)
          break
        case 'hue-rotate':
          this.state.filterObj[type] > 0 && arr.push(`${type}(${this.state.filterObj[type]}deg)`)
          break
        default:
          this.state.filterObj[type] > 0 && arr.push(`${type}(${this.state.filterObj[type]}%)`)
      }
    })
    return arr.join(' ')
  }

  isEmptyObj(obj) {
    for (let key in obj) {
      return false
    }
    return true
  }

  cssImageToPureImage(url) {
    const filter = this.packageFiter()
    const filterValue = filter ? `filter:${filter}` : ''
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
      if (Object.keys(this.state.filterObj).some(key => this.state.filterObj[key] > 0)) {
        const filter = this.packageFiter()
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
          <MySlider title="模糊：" type="blur" value={this.state.filterObj.blur} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="亮度：" type="brightness" value={this.state.filterObj.brightness} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="对比度：" type="contrast" value={this.state.filterObj.contrast} onChange={this.onSliderChange}></MySlider>
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="灰度：" type="grayscale" value={this.state.filterObj.grayscale} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="透明度：" type="opacity" value={this.state.filterObj.opacity} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="饱和度：" type="saturate" value={this.state.filterObj.saturate} onChange={this.onSliderChange}></MySlider>
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="色相旋转：" type="hue-rotate" value={this.state.filterObj['hue-rotate']} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="反转图像：" type="invert" value={this.state.filterObj.invert} onChange={this.onSliderChange}></MySlider>
          <MySlider style={{ marginLeft: 20 }} title="深褐色：" type="sepia" value={this.state.filterObj.sepia} onChange={this.onSliderChange}></MySlider>
        </div>
        <Button style={{ marginTop: 20 }} onClick={this.cssImageToPureImage.bind(this, img)}>生成图片</Button>
      </div>
    )
  }
}

export default MyUpload
