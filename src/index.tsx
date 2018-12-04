import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// config day.js
import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh, null, false)
dayjs.extend(relativeTime)

// // https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
// import { install } from '@material-ui/styles'
// install()

ReactDOM.render(<App />, document.getElementById('root'))

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration)
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// }
