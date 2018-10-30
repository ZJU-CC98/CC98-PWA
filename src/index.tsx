/* tslint:disable */
import { injectGlobal } from 'emotion'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
// @ts-ignore
import zh from 'dayjs/locale/zh-cn'

// @ts-ignore
dayjs.locale(zh, null, false)
dayjs.extend(relativeTime)
injectGlobal`

  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    /* 禁止 Safari 的双击放大 */
    touch-action: manipulation;
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
  .search-input {
padding: 10px 10px;
height: 52px;
position: relative;
}
.search-input::before {
content: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAAQJJREFUKBWVkr2uQUEUhf3ET6GRaC5aFRoJKrf1BKpb8SwqovYGXkCj00k0QnRKEYkILYobvpUYmeMMyVnJl7P3mjN7Zu9zwiGv2qRFyMMSRrAFp6JPN8XzBj+wgDkUYAg7WINTYdwpDECxrRLJHeq2accdkgm8bzTvNAg2EDOGeUYI1KNO1gkuzTA1g8T7ojbn4ONQWPuHPWgeHmnzCqoe15tkSNPgPEAn68oVcOmA2XMtGK9FoE/VhOTTVNExqLCGZnxCv2pYauEC6lF0oQxX6IOvb7yX9NPEQafan+aPXDdQC18LsO6Tip5BBY6gIQaSbnMCFRCBZRcIvFkbsvCr4AFGOCxQy+JdGQAAAABJRU5ErkJggg==');
display: block;
position: absolute;
width: 15px;
z-index: 3;
height: 15px;
font-size: 20px;
top: 11px;
left: 16px;
line-height: 32px;
opacity: 0.6;
}

.search-input > input {
width: 100%;
font-size: 18px;
border: none;
line-height: 22px;
padding: 5px 10px 5px 25px;
height: 32px;
position: relative;
}
.search-input > input:focus {
outline: none;
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
