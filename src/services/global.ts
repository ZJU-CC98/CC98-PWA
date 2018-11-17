import { GET, POST } from '@/utils/fetch'
import { ISignIn } from '@cc98/api'

/**
 * 获取全站基本信息
 */
export function getSiteInfo() {
  return GET('config/global')
}

/**
 * 获取全站主页信息
 */
export function getHomeInfo() {
  return GET('config/index')
}

/**
 * 获取签到信息
 */
export function getSignState() {
  return GET<ISignIn>('me/signin')
}

/**
 * 签到
 */
export function sign() {
  return POST<ISignIn>('me/signin')
}
