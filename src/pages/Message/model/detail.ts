/**
 * @author dongyansong
 * @date 2018-10-26
 */
import { GET, POST } from '@/utils/fetch'
import { IMessageContent } from '@cc98/api'
import { Container } from '@cc98/state'

import reverse from 'lodash-es/reverse'

import userInstace from '@/containers/user'

interface IMap<T> {
  [key: string]: T
}

interface State {
  messages: IMap<IMessageContent[] | undefined>
  isEnd: IMap<boolean>
  isLoading: boolean
  id: number
}

let messageId = -1

export class Detail extends Container<State> {
  state: State = {
    messages: {},
    isEnd: {},
    isLoading: true,
    id: -1,
  }

  init = async (id: number) => {
    if (this.state.messages[id]) {
      this.put(state => {
        state.id = id
      })

      return
    }
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
        state.isEnd[id] = data.length < 20
      })
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
        state.messages[this.state.id] = [...reverse(data), ...(state.messages[this.state.id] || [])]
        state.isLoading = false
        state.isEnd[this.state.id] = data.length < 20
      })
    })
  }

  getNewMessage = async () => {
    this.put(state => (state.isLoading = true))

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
        } else {
          state.messages[this.state.id] = messages
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
          senderId: userInstace.state.myInfo!.id,
          receiverId: this.state.id,
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
