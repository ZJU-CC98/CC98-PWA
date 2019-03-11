import { navigate as reachNavigate, NavigateOptions } from '@reach/router'
import { routerModel } from '@/router'

/**
 * 路由跳转到对应 URL
 * @param url
 * @param options
 */
export function navigate(url: string, options?: NavigateOptions<{}>) {
  if (options && options.replace) {
    routerModel.POP()
  }

  reachNavigate(url, options)
}

export function go(delta?: number | undefined) {
  window.history.go(delta)
}

/**
 * 路由回退
 */
export function goback() {
  // if (forceRefresh) {
  //   // ROUTER_CACHE
  // }

  window.history.back()
}

export default {
  navigate,
  go,
  back: goback,
}
