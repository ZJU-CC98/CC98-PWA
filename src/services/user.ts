import { IUser } from '@cc98/api'
import { GET, PUT, DELETE } from '@/utils/fetch'

/**
 * @description 通过用户id获取用户信息
 * @param {number} id 用户id
 */
export function getUserInfoById(id: number) {
  // TODO: cache

  return GET<IUser>(`/user/${id}`)
}

/**
 * @description 通过用户名获取用户信息
 * @param {string} name 用户名
 */
export function getUserInfoByName(name: string) {
  return GET<IUser>(`/user/name/${name}`)
}

export function getUsersInfo(query: string) {
  return GET<IUser[]>(`user?${query}`)
}

export function unFollowUser(id: number) {
  return DELETE(`/me/followee/${id}`)
}

export function followUser(id: number) {
  return PUT(`/me/followee/${id}`)
}
