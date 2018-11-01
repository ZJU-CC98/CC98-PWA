/**
 * info()
 * success()
 * loading()
 * error()
 * 一共导出四个toast函数
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ConsecutiveSnackbars from './Queue'
import { NotifFnData, ToastData } from './type'

type NotifFn = (
  type: 'success' | 'error' | 'loading' | 'info',
  content: string,
  duration?: number,
  onClose?: () => void
) => void
function createNotification() {
  const div = document.createElement('div')
  document.body.appendChild(div)
  // tslint:disable-next-line:no-angle-bracket-type-assertion
  // const toastNotification = ReactDOM.render(<Toast content={'123'} />, div)
  const toastNotification = ReactDOM.render(<ConsecutiveSnackbars/>, div)

  return {
    addNotice(toastNotice: NotifFnData) {
      if (toastNotification) {
        console.log(toastNotification)
        console.log(toastNotice)
        toastNotification.addNotice(toastNotice)
      }
    },
    destroy() {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    },
  }
}

let notification: typeof ConsecutiveSnackbars | null = null
const notice: NotifFn = (type, content, duration = 2000, onClose) => {
  if (!notification) notification = createNotification()

  notification.addNotice({ type, content, duration, onClose })
}

export default {
  info({ content, duration, onClose }: ToastData) {
    return notice('info', content, duration, onClose)
  },
  success({ content = '操作成功', duration, onClose }: ToastData) {
    return notice('success', content, duration, onClose)
  },
  error({ content, duration, onClose }: ToastData) {
    return notice('error', content, duration, onClose)
  },
  loading({ content = '加载中', duration, onClose }: ToastData) {
    return notice('loading', content, duration, onClose)
  },
}
