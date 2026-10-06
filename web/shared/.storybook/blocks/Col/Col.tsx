import React from 'react'
import type { ModuleExport } from 'storybook/internal/types'
import { useOf } from '@storybook/blocks'
import '../../assets/css/iframe.css'
import './Col.css'

interface IBlockColProps {
  of: ModuleExport
  arg: string
  items: string[]
}

export const BlockCol = ({ of, arg, items }: IBlockColProps) => {
  const { story } = useOf(
    of,
    ['story']
  )

  return (
    <div className="sb-stories-col">
      <h2 className="sb-stories-col__title">{arg}</h2>
      {items.map((item) =>
        <div key={item} className="sb-stories-col__item">
          <h3 className="sb-stories-col__item__title">{item}</h3>
          <iframe
            id={`iframe--${story.id}`}
            title={item}
            src={`iframe.html?viewMode=story&id=${story.id}&args=${arg}:${item}`}
            allow="fullscreen"
            loading="lazy"
            className="sb-stories-iframe"
          ></iframe>
        </div>)}
    </div>
  )
}
