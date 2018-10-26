/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { GET } from '@/utils/fetch'
import { IRecentMessage } from '@cc98/api'
import { Container } from '@cc98/state'
import user from '../user'

interface State {
  recentList: IRecentMessage[]
  recentListEnd: boolean
  recentListLoading: boolean
}

export class MessageStore extends Container<State> {
  state: State = {
    recentList: [],
    recentListEnd: false,
    recentListLoading: true,
  }

  initRecentList = async () => {
    this.put(state => (state.recentListLoading = true))
    const res = await GET<IRecentMessage[]>('message/recent-contact-users?from=0&size=20')
    res.fail().succeed(data => {
      this.put(state => {
        state.recentList = data
        state.recentListLoading = false
        if (data.length < 20) state.recentListEnd = true
      })
      user.getInfos(data.map(item => item.userId))
    })
  }

  getRecentList = async () => {
    this.put(state => (state.recentListLoading = true))
    const res = await GET<IRecentMessage[]>(
      `message/recent-contact-users?from=${this.state.recentList.length}&size=20`
    )
    res.fail().succeed(data => {
      this.saveRecentList(data)
      user.getInfos(data.map(item => item.userId))
    })
  }

  private saveRecentList(data: IRecentMessage[]): void {
    this.put(state => {
      state.recentList.concat(data)
      state.recentListLoading = false
      if (data.length < 20) state.recentListEnd = true
    })
  }
}

export default new MessageStore()
