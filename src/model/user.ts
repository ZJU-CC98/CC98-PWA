/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { FetchError, GET } from '@/utils/fetch'
import { Success, Try } from '@/utils/fp/Try'
import { IUser } from '@cc98/api'
import { Container } from '@cc98/state'
import difference from 'lodash-es/difference'

interface State {
  [id: string]: IUser
}

export class UserInfoStore extends Container {
  state: State = {}

  /**
   * 获取用户信息，会优先返回store中的信息
   * @param {string} id 用户id
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof UserInfoStore
   */
  getInfo = (id: string) => {
    if (this.state[id]) {
      return Promise.resolve(Try.of<IUser, FetchError>(Success.of(this.state[id])))
    }

    return this.forceGetInfo(id)
  }

  /**
   * 强制从服务器获取用户信息
   * @param {string} id 用户id
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof UserInfoStore
   */
  forceGetInfo = async (id: string) => {
    const res = await GET<IUser>(`user/${id}`)

    res.fail().succeed(info => this.setInfo(info))
  }

  /**
   * 批量获取用户信息，store中存在的信息不会重新请求
   * @param {string} id 用户id
   * @return {Promise<Try<IUser, FetchError>>}
   * @memberof UserInfoStore
   */
  getInfos = async (ids: string[]) => {
    const voidIds = difference(ids, Object.keys(this.state))
    if (!voidIds.length) return
    const res = await GET<IUser[]>(`user?id=${voidIds.join('&id=')}`)

    res.fail().succeed(infos => {
      this.put(state => infos.map(item => (state[item.id] = item)))
    })
  }

  setInfo = (data: IUser) => {
    this.put(state => state[data.id] = data)
  }
}

export default new UserInfoStore()