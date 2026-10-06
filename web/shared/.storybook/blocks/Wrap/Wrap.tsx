import React from 'react'
import './Wrap.css'

interface IBlockWrapProps {
  children: React.ReactNode
}

export const BlockWrap = (props: IBlockWrapProps) =>
  <div className="sb-stories-wrap">
    {props.children}
  </div>

