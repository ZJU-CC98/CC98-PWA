/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { GET } from '@/utils/fetch'
import { IRecentMessage } from '@cc98/api'
import { Container } from '@cc98/state'

interface State {
  recentList: IRecentMessage[]
  recentListEnd: boolean
  recentListLoading: boolean
}

export default class MessageStore extends Container<State> {
  state: State = {
    recentList: [],
    recentListEnd: false,
    recentListLoading: true,
  }

  constructor() {
    super()

    this.initRecentList()
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
    })
  }

  getRecentList = async () => {
    this.put(state => (state.recentListLoading = true))
    const res = await GET<IRecentMessage[]>(
      `message/recent-contact-users?from=${this.state.recentList.length}&size=20`
    )
    res.fail().succeed(data => {
      this.saveRecentList(data)
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
