import React, { Component } from 'react'
import { Upload, Card, Button, Icon, message } from 'antd'
import { MySlider } from '../components'
import { guid } from '../utils/common'

class ImageProcess extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
    this.showMessage = this.showMessage.bind(this)
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
    reader.onload = e => {
      this.setState({
        img: e.target.result,
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

  packageFiter() {
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

  cssImageToPureImage() {
    const dom = document.getElementById('inputImg')
    if (!dom) {
      return this.showMessage('请先上传图片')
    }
    const pixelRatio = window.devicePixelRatio || 1
    // 图片宽高
    const width = dom.offsetWidth * pixelRatio
    const height = dom.offsetHeight * pixelRatio
    // 复制DOM节点
    const cloneDom = dom.cloneNode(true)
    cloneDom.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')

    // 设置图片宽高
    cloneDom.width = width
    cloneDom.height = height

    const img = new Image()
    img.onload = () => {
      let canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)
      cloneDom.src = canvas.toDataURL()

      const svgImg = new Image()
      svgImg.onload = () => {
        ctx.clearRect(0, 0, width, height)
        ctx.drawImage(svgImg, 0, 0, width, height)
        this.downloadImage(canvas.toDataURL('image/jpeg'))
      }
      svgImg.src =
        'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' +
        width +
        '" height="' +
        height +
        '"><foreignObject x="0" y="0" width="100%" height="100%">' +
        new XMLSerializer().serializeToString(cloneDom).replace(/#/g, '%23').replace(/\n/g, '%0A') +
        '</foreignObject></svg>'
    }
    img.src = cloneDom.src
  }
  downloadImage(img) {
    let a = document.createElement('a')
    a.href = img
    const filename = guid()
    a.download = filename
    a.click()
  }

  showMessage(msg = '', type = 'error') {
    message[type](msg)
  }
  render() {
    let uploadImg
    const { img } = this.state
    if (img) {
      if (Object.keys(this.state.filterObj).some(key => this.state.filterObj[key] > 0)) {
        const filter = this.packageFiter()
        const filterValue = { filter: filter }
        uploadImg = <Card style={{ width: 300 }} cover={<img id="inputImg" src={img} alt="" style={filterValue} />} bodyStyle={{ display: 'none' }} />
      } else {
        uploadImg = <Card style={{ width: 300 }} cover={<img id="inputImg" src={img} alt="" />} bodyStyle={{ display: 'none' }} />
      }
    }
    const style = {
      marginLeft: 20
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
          <MySlider title="模糊：" type="blur" value={this.state.filterObj.blur} onChange={this.onSliderChange} />
          <MySlider style={style} title="亮度：" type="brightness" value={this.state.filterObj.brightness} onChange={this.onSliderChange} />
          <MySlider style={style} title="对比度：" type="contrast" value={this.state.filterObj.contrast} onChange={this.onSliderChange} />
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="灰度：" type="grayscale" value={this.state.filterObj.grayscale} onChange={this.onSliderChange} />
          <MySlider style={style} title="透明度：" type="opacity" value={this.state.filterObj.opacity} onChange={this.onSliderChange} />
          <MySlider style={style} title="饱和度：" type="saturate" value={this.state.filterObj.saturate} onChange={this.onSliderChange} />
        </div>
        <div className="flex" style={{ marginTop: 10 }}>
          <MySlider title="色相旋转：" type="hue-rotate" value={this.state.filterObj['hue-rotate']} onChange={this.onSliderChange} />
          <MySlider style={style} title="反转图像：" type="invert" value={this.state.filterObj.invert} onChange={this.onSliderChange} />
          <MySlider style={style} title="深褐色：" type="sepia" value={this.state.filterObj.sepia} onChange={this.onSliderChange} />
        </div>
        <Button style={{ marginTop: 20 }} onClick={this.cssImageToPureImage.bind(this, img)}>
          <Icon type="download" />下载图片
        </Button>
      </div>
    )
  }
}

export default ImageProcess
