import { GET } from '@/utils/fetch'

/**
 * 获取全站主页信息
 */
export function getHomeInfo() {
  return GET('config/index')
}
