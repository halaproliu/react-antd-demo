// import React, { Component } from 'react'
import MyCard from '../views/Card'
import MyList from '../views/List'
import ImageProcess from '../views/ImageProcess'

const routes = [{
  path: '/',
  exact: true,
  component: MyCard
}, {
  path: '/list',
  exact: true,
  component: MyList
}, {
  path: '/imageProcess',
  exact: true,
  component: ImageProcess
}, {
  path: '/4',
  exact: true,
  component: () => { }
}]

export default routes
