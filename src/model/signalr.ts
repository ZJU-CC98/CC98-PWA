/**
 * @author dongyansong
 * @date 2018-10-23
 */
import { getAccessToken } from '@/utils/fetch'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage'
import * as SignalR from '@aspnet/signalr'
import { Container } from '@cc98/state'

import apiHost, { HostType } from '@/config/host'
import global from './global'

interface IStore {
  isConnect: boolean
  shouldUseSignalr: boolean
}

export class Store extends Container<IStore> {
  connection: SignalR.HubConnection
  state: IStore = {
    isConnect: false,
    shouldUseSignalr: !!getLocalStorage('signalr'),
  }

  constructor() {
    super()

    this.start()
  }

  start = async () => {
    const shouldUseSignalr =
      global.state.isLogIn && this.state.shouldUseSignalr && apiHost.state.type === HostType.Default
    if (!shouldUseSignalr) return
    let token = await getAccessToken()
    // remove "Bearer "
    token = token.slice(7)

    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${apiHost.state.api}/signalr/notification`, {
        accessTokenFactory: () => token,
        transport: SignalR.HttpTransportType.WebSockets,
      })
      .build()

    this.put(state => {
      state.isConnect = true
    })

    return this.connection.start()
  }

  stop = async () => {
    if (this.state.isConnect) {
      this.connection.stop()
      this.put(state => {
        state.isConnect = false
      })
    }
  }

  setShouldUseSignalr = (status: boolean) => {
    this.put(state => {
      state.shouldUseSignalr = status
    })

    if (status) {
      setLocalStorage('signalr', 'signalr')
    } else {
      removeLocalStorage('signalr')
      this.stop()
    }
  }
}

export default new Store()
