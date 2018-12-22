interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: 'https://openid.cc98.org/connect/token',
  api: 'https://api-v2.cc98.org',
}

export default host
