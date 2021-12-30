import React, { useEffect, useRef } from 'react'
import '@/assets/style/flowchart.styl'

let operators = [
  {
    id: 'INSTANCE_2601174',
    title: '存为mongoDB',
    subtitle: 'SQL脚本',
    ins: true,
    outs: true,
    class: 'success',
    parents: [],
    level: -1,
    data: { id: 'INSTANCE_2601174', noPre: true },
    xIndex: 0,
    yIndex: -1,
    left: 788,
    top: 103,
  },
  {
    id: 'INSTANCE_2601171',
    title: 'job1',
    subtitle: 'SQL脚本',
    left: 800,
    top: 213,
    parents: ['INSTANCE_2601174'],
    ins: true,
    outs: true,
    class: 'danger selected',
    level: 0,
    data: { id: 'INSTANCE_2601171' },
    xIndex: 0,
    yIndex: 0,
  },
  {
    id: 'INSTANCE_2601172',
    title: 'job2',
    subtitle: 'SQL脚本',
    ins: true,
    outs: true,
    class: 'danger',
    parents: ['INSTANCE_2601171'],
    level: 1,
    data: { id: 'INSTANCE_2601172' },
    xIndex: 0,
    yIndex: 1,
    left: 237,
    top: 323,
  },
  {
    id: 'INSTANCE_2601169',
    title: 'job3',
    subtitle: 'SQL脚本',
    ins: true,
    outs: true,
    class: 'danger',
    parents: ['INSTANCE_2601172'],
    level: 2,
    data: { id: 'INSTANCE_2601169', noAfter: true },
    xIndex: 0,
    yIndex: 2,
    left: 788,
    top: 433,
  },
]

function drawLink (fromId, toId, ref) {
  let isHorizontal = false
  let path = ref.current
  console.log('path: ', path);
  let from = operators.find(item => item.id === fromId) || {}
  let to = operators.find(item => item.id === toId) || {}
  let liWidth = 136
  let liHeight = 46
  let linkBending = 100
  let fromX = from.left + liWidth / 2
  let fromY = from.top + liHeight
  let toX = to.left + liWidth / 2
  let toY = to.top
  let bezierIntensity = Math.min(linkBending, Math.max(Math.abs(fromY - toY), Math.abs(fromX - toX)))
  let d
  if (path) {
    if (isHorizontal) {
      d = `M ${fromX} ${fromY} C ${fromX + bezierIntensity} ${fromY} ${toX - bezierIntensity} ${toY} ${toX} ${toY}`
      path.setAttribute('d', d)
    } else {
      d = `M ${fromX} ${fromY} C ${fromX} ${fromY + bezierIntensity} ${toX} ${toY - bezierIntensity} ${toX} ${toY}`
      path.setAttribute('d', d)
    }
  }
}

function getChartLinks (operators) {
  let result = []
  operators.forEach(o => {
    o.parents.forEach(p => {
      let parent = operators.find(op => op.id === p)
      if (parent) {
        result.push({
          from: p,
          to: o.id
        })
      }
    })
  })
  return result
}

function flowchart(props) {
  // const initPostion = (ops, midX, midY) => {
  //   console.log(refs[0].current.offsetWidth)
  //   console.log(refs[0].current.offsetHeight)
  // }
  let result = getChartLinks(operators)
  let refs = result.map(_ => useRef())
  useEffect(() => {
    // let el = document.querySelector('.ant-layout-content')
    // let w = el.clientWidth
    // let h = el.clientHeight
    // let midX = w / 2
    // let midY = h / 2
    // console.log(midX, midY)
    // initPostion(operators, midX, midY)
    result.forEach((item, i) => {
      let ref = refs[i]
      drawLink(item.from, item.to, ref)
    })
  })
  return (
    <div className="flowchart">
      <svg className="flowchart-links">
        { result.map((op, i) => {
          let className = `flowchart-link__${i} flowchart-link`
          return <path ref={refs[i]} style={{strokeWidth: 6}} className={className} key={op.from}></path>
        })}
      </svg>
      <ul className="flowchart-ops">
        {
          operators.map((op, i) => {
            let { left, top, title, subtitle } = op
            let position = { left, top }
            return (
              <li className="flowchart-ops__item" key={op.id} style={ position }>
                <div className="flowchart-ops__item-text">{title}</div>
                <div className="flowchart-ops__item-text">{subtitle}</div>
              </li>
            )
          })
        }
      </ul>
    </div> 
  )
}

export default flowchart
