import React, { useState, useEffect, useRef } from 'react'
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

// https://majido.github.io/scroll-restoration-proposal/history-based-api.html#web-idl
history.scrollRestoration = 'manual'

// import { useSpring, animated } from 'react-spring/hooks'
// import { config } from 'react-spring'

interface ScrollDivProps {
  show: boolean
  zIndex: number
  locState: LocationState
}

let moveX = 0
let updateFn: () => void
export let updateFunc = (x: number) => {
  moveX = x
  updateFn()
}

import { globalScrollMap, ScrollDom } from './utils'

const ScrollDiv = ({ show, zIndex, locState }: ScrollDivProps) => {
  const refreshFn = useState(0)[1]

  const style: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: 'calc(100vh - 56px)',
    overflowY: 'scroll',
    backgroundColor: '#fff',
  }

  const scrollDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollDiv.current) {
      const scrollDom = new ScrollDom()
      scrollDom.scrollDom = scrollDiv.current

      globalScrollMap.set(locState.href, scrollDom)
    }
  }, [])

  if (show) {
    updateFn = () => refreshFn(prev => prev + 1)
    style.left = moveX
  }

  const lastShow = useRef(false)

  useEffect(() => {
    if (lastShow.current !== show) {
      if (show) {
        setImmediate(() => {
          scrollDiv.current &&
            scrollDiv.current.scrollTo({
              top: locState.scrollTop,
              behavior: 'smooth',
            })
        })
      }
      if (!show) {
        if (scrollDiv.current) {
          locState.scrollTop = scrollDiv.current.scrollTop
        }
      }

      lastShow.current = show
    }
  })

  return (
    <div ref={scrollDiv} style={{ ...style, zIndex }}>
      <Router location={locState.location} />
    </div>
  )
}

const CacheRouter: React.FC<ILocation> = ({ location }) => {
  const { locationStates } = useContainer(ROUTER_CACHE).state

  useEffect(() => {
    ROUTER_CACHE.push(location)
  }, [location])

  return (
    <>
      {locationStates.map((locState, i) => (
        <ScrollDiv
          key={locState.href}
          show={locState.href === location.href}
          zIndex={i}
          locState={locState}
        />
      ))}
    </>
  )
}

export default React.memo(() => (
  <Location>{({ location }) => <CacheRouter location={location} />}</Location>
))
