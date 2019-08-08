import React, { Component } from 'react'
import { Card } from 'antd'

class MyCard extends Component {
  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <Card style={{ width: 300 }} cover={<img src="../imgs/1.jpeg" style={{ filter: 'blur(2px)' }} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'grayScale(100%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'brightness(50%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'contrast(30%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
        </div>
        <div style={{ display: 'flex', marginTop: 20 }}>
          <Card style={{ width: 300 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'hue-rotate(90deg)'}} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'invert(100%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'saturate(30%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
          <Card style={{ width: 300, marginLeft: 20 }} cover={<img src="../imgs/1.jpeg" style={{filter: 'sepia(100%)'}} alt="" />} bodyStyle={{ display: 'none' }} />
        </div>
      </div>
    )
  }
}

export default MyCard
