// import React, { Component } from 'react'
import MyCard from '../views/Card'
import MyList from '../views/List'
import ImageProcess from '../views/ImageProcess'
import Table from '../views/Table'

const routes = [{
  path: '/',
  exact: true,
  title: '卡片',
  icon: 'dashboard',
  menuKey: 'index',
  component: MyCard
}, {
  path: '/list',
  exact: true,
  title: '列表',
  icon: 'contacts',
  menuKey: 'list',
  component: MyList
}, {
  path: '/imageProcess',
  exact: true,
  title: '图片处理',
  icon: 'upload',
  menuKey: 'imageProcess',
  component: ImageProcess
}, {
  path: '/table',
  exact: true,
  title: '表格',
  icon: 'table',
  menuKey: 'table',
  component: Table
}]

export default routes
