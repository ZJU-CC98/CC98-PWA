import { GET, POST } from '@/utils/fetch'
import { ISignIn, ISite } from '@cc98/api'

/**
 * 获取全站基本信息
 */
export function getSiteInfo() {
  return GET<ISite>('config/global')
}

/**
 * 获取全站主页信息
 */
export function getHomeInfo() {
  // FIXME:
  return GET<any>('config/index')
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
export function signIn() {
  return POST<ISignIn>('me/signin')
}
