
export enum HostType {
  Proxy,
  Default,
}

interface IHost {
  oauth: string
  api: string
  type: HostType
}

const defaultHost: IHost = {
  oauth: 'https://openid.cc98.org/connect/token',
  api: 'https://api-v2.cc98.org',
  type: HostType.Default,
}

const proxyHost: IHost = {
  oauth: 'https://openid1.cc98.vaynetian.com/connect/token',
  api: 'https://api1.cc98.vaynetian.com',
  type: HostType.Proxy,
}

/**
 * 代理设置
 */
let host = defaultHost

/**
 * 切换代理
 */
const changeHost = (hostType: HostType) => {
  host = hostType === HostType.Default ? defaultHost : proxyHost
}

export { host as default, changeHost }
