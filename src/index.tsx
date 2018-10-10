import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'emotion'

import App from './App'

injectGlobal`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    background-color: #f5f5f5;
  }
`

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js').then(registration => {
//       console.log('SW registered: ', registration)
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError)
//     })
//   })
// }
