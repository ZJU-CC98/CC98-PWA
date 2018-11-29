/* tslint:disable */
import { injectGlobal } from 'emotion'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import dayjs from 'dayjs'
import zh from 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale(zh, null, false)
dayjs.extend(relativeTime)

// // https://material-ui.com/css-in-js/basics/#migration-for-material-ui-core-users
// import { install } from '@material-ui/styles'
// install()

injectGlobal`
  * {
    box-sizing: border-box;
  }
  html {
    height: 100%;
  }
  body {
    margin: 0;
    height: 100%;
    /* 禁止 Safari 的双击放大 */
    touch-action: manipulation;
    /* 平滑滚动 */
    scroll-behavior: smooth;
  }
  #root {
    height: 100%;
  }
  /* https://stackoverflow.com/questions/2781549/removing-input-background-colour-for-chrome-autocomplete */
  @keyframes autofill {
    to {
      color: #666;
      background: transparent;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    animation-name: autofill;
    animation-fill-mode: both;
  }
  /* https://stackoverflow.com/questions/5106934/prevent-grey-overlay-on-touchstart-in-mobile-safari-webview */
  div {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`

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
