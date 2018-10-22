import { Container } from '@cc98/state'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '@/utils/storage'

import basic from './basicInstance'

export enum HostType {
  defaultHost,
  Proxy,
}

interface Host {
  oauth: string
  api: string
  type: HostType
}

const defaultHost: Host = {
  oauth: 'https://openid.cc98.org/connect/token',
  api: 'https://api-v2.cc98.org',
  type: HostType.defaultHost,
}

const proxy: Host = {
  oauth: 'https://openid0.cc98.inzju.com/connect/token',
  api: 'https://api0.cc98.inzju.com',
  type: HostType.Proxy,
}

export class Store extends Container<Host> {
  constructor() {
    super()
    this.state = getLocalStorage('proxy') ? proxy : defaultHost
    this.useDefault = this.useDefault.bind(this)
    this.useProxy = this.useProxy.bind(this)
  }

  useDefault() {
    this.put(state => {
      Object.assign(state, defaultHost)
    })
    removeLocalStorage('proxy')
    basic.LogOut() // logout when change proxy
  }

  useProxy() {
    this.put(state => {
      Object.assign(state, proxy)
    })
    setLocalStorage('proxy', 'proxy')
    basic.LogOut() // logout when change proxy
  }
}

export default new Store()
