interface IHost {
  oauth: string
  api: string
}

const host: IHost = {
  oauth: process.env.oauth || 'https://openid.cc98.org/connect/token',
  api: process.env.api || 'https://api-v2.cc98.org',
}

export default host
