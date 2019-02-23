import history from '@/utils/history'

/**
 * 全局手势滑动
 *
 * TODO: 动画效果
 */

const globalBack = {
  clientX: 0,
  clientY: 0,
}

document.addEventListener(
  'touchstart',
  (event: TouchEvent) => {
    globalBack.clientX = event.changedTouches[0].clientX
    globalBack.clientY = event.changedTouches[0].clientY
  },
  false
)

import { updateFunc } from './index'

document.addEventListener(
  'touchmove',
  (event: TouchEvent) => {
    if (globalBack.clientX > 100) {
      return
    }

    const moveX = event.changedTouches[0].clientX - globalBack.clientX
    updateFunc(moveX)
  },
  false
)

document.addEventListener(
  'touchend',
  (event: TouchEvent) => {
    updateFunc(0)

    const moveX = event.changedTouches[0].clientX - globalBack.clientX
    const moveY = event.changedTouches[0].clientY - globalBack.clientY

    if (Math.abs(moveY) > 40) {
      return
    }

    if (moveX > 150) {
      history.go(-1)
    }
    if (moveX < -150) {
      history.go(1)
    }
  },
  false
)
