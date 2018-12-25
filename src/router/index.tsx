import React, { useEffect, useRef } from 'react'
// https://reach.tech/router/api/Router
import { Location, WindowLocation } from '@reach/router'
import Router, { ILocation } from './Router'

import useContainer, { Container } from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

import './gesture'

interface LocationState {
  href: string
  location: WindowLocation
  scrollTop: number
}

interface State {
  locationStates: LocationState[]
  MAX_CACHE_SIZE: number
}

/**
 * 路由级页面缓存
 */
class RouterCacheContainer extends Container<State> {
  state: State = {
    locationStates: [],
    MAX_CACHE_SIZE: settingInstance.state.routerCacheSize,
  }

  /**
   * 新增路由缓存 (LRU)
   * @param location
   */
  push(location: WindowLocation) {
    const { locationStates, MAX_CACHE_SIZE } = this.state
    const index = locationStates.findIndex(locState => locState.href === location.href)

    if (index !== -1) {
      const loc = locationStates[index]
      locationStates.splice(index, 1)
      locationStates.push(loc)
    } else {
      locationStates.push({
        href: location.href,
        location: { ...location },
        scrollTop: 0,
      })
      // 超过最大缓存数
      if (locationStates.length > MAX_CACHE_SIZE) {
        locationStates.shift()
      }
    }

    this.setState({ locationStates })
  }
}

/**
 * 路由缓存实例
 */
export const ROUTER_CACHE = new RouterCacheContainer()

/**
 * 将函数触发限定在某一路由下（配合事件绑定用）
 * @param func 待绑定函数
 * @param href 路由
 */
// tslint:disable-next-line
export function bindURL(func: Function, href: string) {
  return () => {
    if (window.location.href === href) {
      func()
    }
  }
}

// https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl
history.scrollRestoration = 'manual'

// @ts-ignore FIXME: no animated export from d.ts
import { useSpring, animated } from 'react-spring/hooks'
import { config } from 'react-spring'

interface ScrollDivProps {
  show: boolean
  locState: LocationState
}

const ScrollDiv = ({ show, locState }: ScrollDivProps) => {
  const lastShow = useRef(false)
  const [props, set] = useSpring(() => ({
    opacity: 0,
    config: config.gentle,
  }))

  if (lastShow.current !== show) {
    if (show) {
      // @ts-ignore
      set({ opacity: 1 })

      setTimeout(() => {
        if (!locState.scrollTop) {
          return
        }
        window.scrollTo({
          left: 0,
          top: locState.scrollTop,
          // behavior: 'smooth',
        })
        // FIXME: choose a better delay
      }, 300)
    }

    if (!show) {
      // @ts-ignore
      set({ opacity: 0 })
      locState.scrollTop = window.scrollY
    }

    lastShow.current = show
  }

  const style = show ? props : { display: 'none' }

  return (
    <animated.div style={style}>
      <Router location={locState.location} />
    </animated.div>
  )
}

const CacheRouter: React.FC<ILocation> = ({ location }) => {
  const { locationStates } = useContainer(ROUTER_CACHE).state

  useEffect(
    () => {
      ROUTER_CACHE.push(location)
    },
    [location]
  )

  return (
    <>
      {locationStates.map(locState => (
        <ScrollDiv key={locState.href} show={locState.href === location.href} locState={locState} />
      ))}
    </>
  )
}

export default React.memo(() => (
  <Location>{({ location }) => <CacheRouter location={location} />}</Location>
))
