/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { GET, POST } from '@/utils/fetch'
import { IMessageContent } from '@cc98/api'
import { Container } from '@cc98/state'
import reverse from 'lodash-es/reverse'
import global from '../global'
import user from '../user'

interface IMap<T> {
  [key: string]: T
}

interface State {
  messages: IMap<IMessageContent[] | undefined>
  isEnd: boolean
  isLoading: boolean
  id: string
}

let messageId = -1

export class Detail extends Container<State> {
  state: State = {
    messages: {},
    isEnd: false,
    isLoading: true,
    id: '',
  }

  init = async (id: string) => {
    if (this.state.messages[id]) return
    this.put(state => (state.isLoading = true))

    const res = await GET<IMessageContent[]>(`message/user/${id}`, {
      params: {
        from: '0',
        size: '20',
      },
    })

    res.fail().succeed(data => {
      this.put(state => {
        state.messages[id] = reverse(data)
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
        from: `${(this.state.messages[this.state.id] || []).length}`,
        size: '20',
      },
    })

    res.fail().succeed(data => {
      this.put(state => {
        state.messages[this.state.id] = [...reverse(data), ...state.messages[this.state.id] || []]
        state.isLoading = false
        if (data.length < 20) state.isEnd = true
      })
    })
  }

  getNewMessage = async () => {
    this.put(state => state.isLoading = true)

    const res = await GET<IMessageContent[]>(`message/user/${this.state.id}`, {
      params: {
        from: '0',
        size: '1',
      },
    })

    res.fail().succeed(messages => {
      this.put(state => {
        if (messages[0] && this.state.messages[this.state.id]) {
          state.messages[this.state.id]!.push(messages[0])
        } else if (messages[0]) {
          state.messages[this.state.id]
        }
      })
    })
  }

  sendMessage = async (content: string) => {
    const res = await POST('message', {
      params: {
        content,
        receiverId: this.state.id,
      },
    })

    res.fail().succeed(() => {
      this.put(state => {
        const newMessage = {
          content,
          id: messageId,
          senderId: global.state.myInfo!.id,
          receiverId: parseInt(this.state.id, 10),
          time: new Date(Date.now()).toUTCString(),
          isRead: true,
        }
        if (this.state.messages[this.state.id]) {
          state.messages[this.state.id]!.push(newMessage)
        } else {
          state.messages[this.state.id] = [newMessage]
        }
        messageId -= 1
      })
    })
  }
}

export default new Detail()
