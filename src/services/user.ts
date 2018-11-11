import { Try } from '@/utils/fp/Try'
import { IUser } from '@cc98/api'
import { FetchError, GET } from '@/utils/fetch'

/**
 * @description 通过用户id获取用户信息
 * @param {number} id 用户id
 * @return {Promise<Try<IUser, FetchError>>}
 */
export function getUserInfoById(id: number): Promise<Try<IUser, FetchError>> {
  return GET<IUser>(`/user/${id}`)
}

/**
 * @description 通过用户名获取用户信息
 * @param {string} name 用户名
 * @return {Promise<Try<IUser, FetchError>>}
 */
export function getUserInfoByName(name: string): Promise<Try<IUser, FetchError>> {
  return GET<IUser>(`/user/name/${name}`)
}
