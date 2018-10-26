/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { GET } from '@/utils/fetch'
import { IMessageContent } from '@cc98/api'
import { Container } from '@cc98/state'
import user from '../user'

interface State {
  messages: IMessageContent[]
  isEnd: boolean
  isLoading: boolean
  id: string
}

export class DetailMap extends Container<State> {
  state: State = {
    messages: [],
    isEnd: false,
    isLoading: true,
    id: '',
  }

  init = async (id: string) => {
    this.put(state => (state.isLoading = true))

    const res = await GET<IMessageContent[]>(`message/user/${id}`, {
      params: {
        from: '0',
        size: '20',
      },
    })

    res.fail().succeed(data => {
      this.put(state => {
        state.messages = data
        state.isLoading = false
        state.id = id
        if (data.length < 20) state.isEnd = true
      })
      user.getInfo(id)
    })
  }

  getList = async () => {
    this.put(state => (state.isLoading = true))

    const res = await GET<IMessageContent[]>(`message/user/${this.state.id}`, {
      params: {
        from: `${this.state.messages.length}`,
        size: '20',
      },
    })

    res.fail().succeed(data => {
      this.put(state => {
        state.messages.concat(data)
        state.isLoading = false
        if (data.length < 20) state.isEnd = true
      })
    })
  }
}

export default new DetailMap()
