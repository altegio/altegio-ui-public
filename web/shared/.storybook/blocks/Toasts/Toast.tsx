import React, { useEffect } from 'react'

export interface IToastProps {
  id: string
  destroy: () => void
  title?: string
  content: string
  duration?: number
}

const Toast: React.FC<IToastProps> = (props) => {
  const { destroy, content, title = '', duration = 0 } = props

  useEffect(() => {
    if (!duration) return

    const timer = setTimeout(() => {
      destroy()
    },
    duration)

    return () => {
      clearTimeout(timer)
    }
  },
  [
    destroy,
    duration
  ])

  return (
    <div className="sb-stories-toast">
      <div className="sb-stories-toast-content"><b>{title ? `${title} - ` : ''}</b> {content}</div>
    </div>
  )
}

export default Toast
