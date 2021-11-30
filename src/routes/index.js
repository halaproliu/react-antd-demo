// import React, { Component } from 'react'
import MyCard from '../views/Card'
import MyList from '../views/List'
import ImageProcess from '../views/ImageProcess'
import Table from '../views/Table'
import JsonView from '../views/JsonView'
import flowchart from '../views/flowchart'
// import MediaPlayer from '../views/MediaPlayer'

const routes = [
  {
    path: '/',
    exact: true,
    title: '卡片',
    icon: 'dashboard',
    menuKey: 'index',
    component: MyCard
  },
  {
    path: '/list',
    exact: true,
    title: '列表',
    icon: 'contacts',
    menuKey: 'list',
    component: MyList
  },
  {
    path: '/imageProcess',
    exact: true,
    title: '图片处理',
    icon: 'upload',
    menuKey: 'imageProcess',
    component: ImageProcess
  },
  {
    path: '/table',
    exact: true,
    title: '表格',
    icon: 'table',
    menuKey: 'table',
    component: Table
  },
  {
    path: '/json',
    exact: true,
    title: 'JSON格式化',
    icon: 'snippets',
    menuKey: 'json',
    component: JsonView
  },
  {
    path: '/flowchart',
    exact: true,
    title: 'flowchart',
    icon: 'snippets',
    menuKey: 'flowchart',
    component: flowchart
  }
  // {
  //   path: '/mediaPlayer',
  //   exact: true,
  //   title: '播放器',
  //   icon: 'play-circle',
  //   menuKey: 'mediaPlayer',
  //   component: MediaPlayer
  // }
]

export default routes
