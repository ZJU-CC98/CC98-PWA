import { navigate as reachNavigate, NavigateOptions } from '@reach/router'

// TODO: 忽略不需要 cache 的页面

/**
 * 路由跳转到对应 URL
 * @param url
 * @param options
 */
export function navigate(url: string, options?: NavigateOptions<{}>) {
  reachNavigate(url, options)
}

export function go(delta?: number | undefined) {
  window.history.go(delta)
}

/**
 * 路由回退
 */
export function goback() {
  // if (noCache) {
  //   // ROUTER_CACHE
  // }

  window.history.back()
}

export default {
  navigate,
  go,
  back: goback,
}
