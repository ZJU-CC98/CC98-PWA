import React, { useEffect, useRef } from 'react'
import { useSpring, animated } from 'react-spring'

import history from '@/utils/history'

const MoveDiv: React.FC = ({ children }) => {
  const divStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
  }

  const [style, set] = useSpring(() => ({
    left: 0,
  }))

  const divRef = useRef<HTMLDivElement>(null)
  const touchX = useRef(0)

  useEffect(() => {
    if (!divRef.current) {
      return
    }
    const divDom = divRef.current

    divDom.addEventListener('touchstart', (event: TouchEvent) => {
      touchX.current = event.changedTouches[0].clientX
    })

    divDom.addEventListener('touchmove', (event: TouchEvent) => {
      if (touchX.current > 100) {
        return
      }

      const moveX = event.changedTouches[0].clientX - touchX.current
      set({
        left: moveX,
      })
    })

    divDom.addEventListener('touchend', (event: TouchEvent) => {
      set({
        left: 0,
      })

      const moveX = event.changedTouches[0].clientX - touchX.current

      if (moveX > 150) {
        history.go(-1)
      }

      if (moveX < -150) {
        history.go(1)
      }
    })
  }, [])

  return (
    <animated.div ref={divRef} style={{ ...divStyle, ...style }}>
      {children}
    </animated.div>
  )
}

export default MoveDiv
