import React, { useEffect } from 'react'
// https://reach.tech/router/api/Router
import { Location, WindowLocation } from '@reach/router'
import Router, { ILocation } from './Router'

import useContainer, { Container } from '@/hooks/useContainer'

import './gesture'

interface State {
  locations: WindowLocation[]
  /**
   * 最大缓存页面数
   * TODO: 加入 setting 配置
   */
  MAX_CACHE_SIZE: number
}

/**
 * 路由级页面缓存
 */
class RouterCacheContainer extends Container<State> {
  state: State = {
    locations: [],
    MAX_CACHE_SIZE: 3,
  }

  /**
   * 新增路由缓存 (LRU)
   * @param location
   */
  push(location: WindowLocation) {
    const { locations, MAX_CACHE_SIZE } = this.state
    const index = locations.findIndex(backLoc => backLoc.href === location.href)

    if (index !== -1) {
      const loc = locations[index]
      locations.splice(index, 1)
      locations.push(loc)
    } else {
      locations.push({ ...location })
      // 超过最大缓存数
      if (locations.length > MAX_CACHE_SIZE) {
        locations.shift()
      }
    }

    this.setState({ locations })
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

const CacheRouter: React.FunctionComponent<ILocation> = ({ location }) => {
  const { locations } = useContainer(ROUTER_CACHE).state

  useEffect(
    () => {
      ROUTER_CACHE.push(location)
    },
    [location]
  )

  return (
    <>
      {locations.map(backLoc => (
        <div
          key={backLoc.href}
          style={{ display: backLoc.href === location.href ? 'block' : 'none' }}
        >
          <Router location={backLoc} />
        </div>
      ))}
    </>
  )
}

export default React.memo(() => (
  <Location>{({ location }) => <CacheRouter location={location} />}</Location>
))
