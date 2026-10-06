import React, { createContext, useContext, useState } from 'react'
import type { IToastProps } from './Toast'
import Toast from './Toast'

import './Toast.css'

interface ToastOptions {
  id?: string
  title?: string
  content: string
  duration?: number
}

interface ToastContextProps {
  show: (options: ToastOptions) => void
  destroy: (id: string) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)


export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [
    toasts,
    setToasts
  ] = useState<IToastProps[]>([])

  const show = (options: ToastOptions) => {
    // eslint-disable-next-line
    const toastUId = options.id || Math.random().toString(36).
      substring(2,
        9)
    const newToast: IToastProps = {
      id: toastUId,
      ...options,
      destroy: () => {
        destroy(toastUId)
      }
    }

    setToasts((prevToasts) =>
      [
        newToast,
        ...prevToasts
      ])
  }

  const destroy = (id: string) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) =>
        toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ show, destroy }}>
      {children}
      <div className="sb-stories-toast-container">
        {toasts.map((toastProps) =>

          <Toast key={toastProps.id} {...toastProps} />
        )}
      </div>
    </ToastContext.Provider>
  )
}
export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
