/* tslint:disable */
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
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
  .fade-enter {
  opacity: 0;
  z-index: 1;
  }
  .fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 450ms ease-in;
  }
  .transition-group {
  flex: 1;
  position: relative;
  }
`
