/* tslint:disable */
import { Try, Success, Failure } from './fp/Try'
import { FetchError, encodeParams } from './fetch'
import { getLocalStorage, setLocalStorage, removeLocalStorage } from './storage'

import host from '@/config/host'

/**
 * 访问令牌
 */
export interface Token {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

/**
 * 从本地取得 access_token，如果过期尝试刷新
 */
export async function getAccessToken(): Promise<string> {
  let accessToken = getLocalStorage('access_token')

  if (!accessToken) {
    const refreshToken = getLocalStorage('refresh_token') as string

    if (!refreshToken) {
      return ''
    }

    const token = await getTokenByRefreshToken(refreshToken)
    token
      .fail(() => {
        // TODO: 添加 refresh token 过期的处理
      })
      .succeed(token => {
        const access_token = `${token.token_type} ${token.access_token}`
        setLocalStorage('access_token', access_token, token.expires_in)
        // refresh_token 有效期一个月
        setLocalStorage('refresh_token', token.refresh_token, 2592000)

        accessToken = access_token
      })
  }

  return accessToken as string
}

/**
 * 使用refresh_token获取token
 */
async function getTokenByRefreshToken(refreshToken: string) {
  const requestBody = {
    client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  const response = await fetch(host.oauth, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: encodeParams(requestBody),
  })

  if (!(response.ok && response.status === 200)) {
    // TODO: maybe can remove ?
    return Try.of<Token, FetchError>(
      Failure.of({
        status: response.status,
        msg: await response.text(),
        response,
      })
    )
  }

  return Try.of<Token, FetchError>(Success.of(await response.json()))
}

/**
 * 登录
 */
export async function logIn(username: string, password: string) {
  /**
   * 请求的正文部分
   * 密码模式需要 5个参数
   * 其中 client_id 和 client_secret 来自申请的应用，grant_type 值为 "password"
   */
  const requestBody = {
    client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'password',
    username,
    password,
    scope: 'cc98-api openid offline_access',
  }

  const response = await fetch(host.oauth, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: encodeParams(requestBody),
  })

  if (!(response.ok && response.status === 200)) {
    return Try.of<Token, FetchError>(
      Failure.of({
        status: response.status,
        msg: await response.text(),
        response,
      })
    )
  }

  const token = await response.json()

  const access_token = `${token.token_type} ${token.access_token}`
  setLocalStorage('access_token', access_token, token.expires_in)
  // refresh_token 有效期一个月
  setLocalStorage('refresh_token', token.refresh_token, 2592000)

  return Try.of<Token, FetchError>(Success.of(token))
}

/**
 * 登出
 */
export function logOut() {
  removeLocalStorage('access_token')
  removeLocalStorage('refresh_token')
}

/**
 * 判断是否登录
 */
export function isLogIn() {
  return !!getLocalStorage('refresh_token')
}
