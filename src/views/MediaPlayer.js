import React, { Component } from 'react'
import { Slider, Icon } from 'antd'

class MediaPlayer extends Component {
  state = {
    wrapperStyle: {
      width: 500,
      height: 150,
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    audioObj: {
      defaultValue: 0,
      value: 0,
      defaultSound: 0,
      sound: 0,
      soundDisabled: false,
      isPlay: false,
      step: 1,
      duration: 0
    },
    musicList: ['SomethingJustLikeThis.mp3', 'Liekkas.mp3'],
    currentIndex: 0
  }

  constructor(props) {
    super(props)
    this.initMedia = this.initMedia.bind(this)
    this.play = this.play.bind(this)
    this.next = this.next.bind(this)
  }

  componentDidMount() {
    this.initMedia('audio')
  }

  initMedia(el) {
    const dom = document.getElementById(el)
    if (!dom) return
    dom.load()
    dom.oncanplay = () => {
      const duration = dom.duration
      // const step = duration / 100
      const audioObj = {
        duration: duration
      }
      this.setState({
        audioObj: {
          ...this.state.audioObj,
          audioObj
        }
      })
    }
  }

  play() {
    const el = document.getElementById('audio')
    if (!el) return
    let timeout
    if (el.paused) {
      el.play()
      const audioObj = this.state.audioObj
      timeout = setTimeout(() => {
        audioObj.value = this.state.step
        this.setState({})
      }, 1000)
    } else {
      el.pause()
    }
    const audioObj = this.state.audioObj
    audioObj.isPlay = !audioObj.isPlay
    this.setState({
      audioObj: audioObj
    })
  }

  next() {
    const el = document.getElementById('audio')
    let currentIndex = this.state.currentIndex
    currentIndex++
    currentIndex = currentIndex > this.state.musicList.length - 1 ? 0 : currentIndex
    this.setState({
      currentIndex: currentIndex
    })
  }
  render() {
    const { defaultValue, value, isPlay, soundDisabled, defaultSound, sound } = this.state.audioObj
    return (
      <div style={this.state.wrapperStyle}>
        <h3 style={{ textAlign: 'center', marginTop: 20 }}>lemon</h3>
        <Slider style={{ width: 300, margin: '0 auto', marginTop: 20 }} defaultValue={defaultValue} value={value} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Icon style={{ fontSize: 30 }} type="step-backward" />
          <Icon style={{ fontSize: 30, marginLeft: 20 }} type={isPlay ? 'pause' : 'play-circle'} onClick={this.play} />
          <Icon style={{ fontSize: 30, marginLeft: 20 }} type="step-forward" onClick={this.next} />
          <Icon style={{ fontSize: 30, marginLeft: 20 }} type="sound" />
          <Slider style={{ width: 130, marginLeft: 20 }} disabled={soundDisabled} defaultValue={defaultSound} value={sound} allowClear />
        </div>
        <audio id="audio" src={`${process.env.PUBLIC_URL}/music/${this.state.musicList[this.state.currentIndex]}`} />
      </div>
    )
  }
}

export default MediaPlayer
