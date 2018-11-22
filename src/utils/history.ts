import { navigate as reachNavigate, NavigateOptions } from '@reach/router'

// TODO: 忽略不需要 cache 的页面

export function navigate(url: string, options?: NavigateOptions<{}>) {
  reachNavigate(url, options)
}

export function go(delta?: number | undefined) {
  window.history.go(delta)
}

export function goback() {
  window.history.back()
}

export default {
  navigate,
  go,
  back: goback,
}
