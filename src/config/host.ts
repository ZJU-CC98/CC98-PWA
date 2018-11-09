/**
 * @author dongyansong
 * @date 2018-11-05
 */
import { getLocalStorage } from '@/utils/storage'

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

const proxy: IHost = {
  oauth: 'https://openid0.cc98.vaynetian.com/connect/token',
  api: 'https://api0.cc98.vaynetian.com',
  type: HostType.Proxy,
}

const host = getLocalStorage('proxy') ? proxy : defaultHost

export default host
