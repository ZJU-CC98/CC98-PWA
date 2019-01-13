import { IUser } from '@cc98/api'
import { GET, PUT, DELETE, POST } from '@/utils/fetch'

import { memoize } from 'lodash-es'

/**
 * @description 通过用户id获取用户信息
 * @param {number} id 用户id
 */
export const getUserInfoById = memoize((id: string | number) => GET<IUser>(`user/${id}`))

/**
 * @description 通过用户名获取用户信息
 * @param {string} name 用户名
 */
export function getUserInfoByName(name: string) {
  return GET<IUser>(`user/name/${name}`)
}

/**
 * @description 通过 用户ID 批量获取用户信息
 */
export function getUsersInfoByIds(ids: number[]) {
  const query = ids.map(id => `id=${id}`).join('&')

  return GET<IUser[]>(`user?${query}`)
}

/**
 * 关注一个用户
 * @param id 用户 ID
 */
export function followUser(id: number) {
  return PUT(`me/followee/${id}`)
}

/**
 * 取关一个用户
 * @param id 用户 ID
 */
export function unFollowUser(id: number) {
  return DELETE(`me/followee/${id}`)
}

/**
 * 修改个人资料
 */
export function modifyMyInfo(newInfo: IUser) {
  return PUT('me', {
    params: newInfo,
  })
}

/**
 * 上传个人头像
 */
export function updateMyAvatar(file: File) {
  const formData = new FormData()
  formData.append('files', file, file.name)
  formData.append('contentType', 'multipart/form-data')

  return POST<string>('file', {
    headers: {
      // Content-Type 置空
    },
    requestInit: {
      body: formData,
    },
  })
}
/**
 * 修改个人头像
 */
export function modifyMyAvatar(newAvatar: string) {
  return PUT('me/portrait', {
    params: newAvatar,
  })
}
