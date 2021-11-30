import React from 'react'
import '@/assets/style/flowchart.styl'

function flowchart(props) {
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
      left: 788,
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
      left: 788,
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
  return (
    <div className="flowchart">
      <svg>
        { operators.map(op => {
          return <path d="" key={op.id}></path>
        })}
      </svg>
      <ul className="flowchart-ops">
        {
          operators.map(op => {
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
