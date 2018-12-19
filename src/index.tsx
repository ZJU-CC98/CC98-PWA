import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// config day.js
import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh, null, false)
dayjs.extend(relativeTime)

// global style
import './style.css'

// 错误捕获
import Sentry from '@sentry/browser'
import version from './version'

class ErrorBoundary extends React.Component {
  // tslint:disable-next-line
  componentDidCatch(err: any, info: any) {
    Sentry.captureException(err)
  }

  render() {
    return this.props.children
  }
}

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://d3350c985001442db70dccbc3d6e99c6@sentry.io/1356614',
    release: version,
  })
}

// service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        // console.log('SW registered: ', registration)
      })
      .catch(registrationError => {
        // console.log('SW registration failed: ', registrationError)
      })
  })
}
