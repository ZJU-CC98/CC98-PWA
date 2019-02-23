import React, { useEffect, useRef } from 'react'
// https://reach.tech/router/api/Router
import { Location, WindowLocation } from '@reach/router'
import Router, { ILocation } from './Router'

import useContainer, { Container } from '@/hooks/useContainer'
import settingInstance from '@/containers/setting'

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

interface ScrollDivProps {
  show: boolean
  zIndex: number
  locState: LocationState
}

import { globalScrollMap, ScrollDom } from './utils'
import MoveDiv from './MoveDiv'

const ScrollDiv = ({ show, zIndex, locState }: ScrollDivProps) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    width: '100%',
    height: 'calc(100vh - 56px)',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    zIndex,
  }

  const scrollDiv = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollDiv.current) {
      const scrollDom = new ScrollDom()
      scrollDom.scrollDom = scrollDiv.current

      globalScrollMap.set(locState.href, scrollDom)
    }
  }, [])

  const lastShow = useRef(false)

  useEffect(() => {
    if (lastShow.current === show) {
      return
    }

    // hide -> show
    if (show) {
      setImmediate(() => {
        scrollDiv.current &&
          scrollDiv.current.scrollTo({
            top: locState.scrollTop,
            // behavior: 'smooth',
          })
      })
    } else {
      // show -> hide
      if (scrollDiv.current) {
        locState.scrollTop = scrollDiv.current.scrollTop
      }
    }

    lastShow.current = show
  })

  return (
    <div ref={scrollDiv} style={style}>
      <MoveDiv>
        <Router location={locState.location} />
      </MoveDiv>
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
