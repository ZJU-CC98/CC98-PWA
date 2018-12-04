import React from 'react'
// https://reach.tech/router/api/Router
import { Location, WindowLocation } from '@reach/router'
import MyRouter, { ILocation } from './MyRouter'

import './gesture'

/**
 * 路由级页面缓存
 */
const _ROUTER_CACHE: WindowLocation[] = []

// 最大缓存页面数
// TODO: 加入 setting 配置
const MAX_CACHE_SIZE = 0

const CacheRouter: React.FunctionComponent<ILocation> = ({ location }) => {
  if (_ROUTER_CACHE.length > MAX_CACHE_SIZE) {
    _ROUTER_CACHE.shift()
  }

  if (_ROUTER_CACHE.every(backLoc => backLoc.href !== location.href)) {
    _ROUTER_CACHE.push({ ...location })
  }

  return (
    <>
      {_ROUTER_CACHE.map(backLoc => (
        <div
          key={backLoc.href}
          style={{ display: backLoc.href === location.href ? 'block' : 'none' }}
        >
          <MyRouter location={backLoc} />
        </div>
      ))}
    </>
  )
}

// tslint:disable-next-line
export function bindURL(func: Function, href: string) {
  return () => {
    if (window.location.href === href) {
      func()
    }
  }
}

export default React.memo(() => (
  <Location>{({ location }) => <CacheRouter location={location} />}</Location>
))
