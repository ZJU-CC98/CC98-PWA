/* tslint:disable */
import { getLocalStorage, setLocalStorage } from './storage'

import { Failure, Success, Try } from './fp/Try'

import host from '@/model/apiHost'

export interface FetchError {
  /**
   * http 状态码
   */
  status: number
  /**
   * 错误信息，取自 response.text()
   */
  msg: string
  /**
   * response 本体
   */
  response: Response
}

async function cc98Fetch<T>(url: string, init: RequestInit): Promise<Try<T, FetchError>> {
  // const baseUrl = "https://apitest.niconi.cc"
  // const baseUrl = "https://api-v2.cc98.org"
  const baseUrl = host.state.api
  const requestURL = `${baseUrl}/${url}`

  // console.log("Fetch: " + requestURL)
  const response = await fetch(requestURL, init)

  if (!(response.ok && response.status === 200)) {
    return Try.of<T, FetchError>(
      Failure.of({
        status: response.status,
        msg: await response.text(),
        response,
      })
    )
  }
  let data = null;
  try {
    data = await response.clone().json();
  } catch (e) {
    data = await response.text();
  }
  return Try.of<T, FetchError>(Success.of(
    data
  ))
}

interface GETOptions {
  /**
   * 标识不携带 access_token，默认携带
   */
  noAuthorization?: true
  /**
   * headers 参数
   */
  headers?: Headers | string[][] | Record<string, string>
  /**
   * 其他请求参数
   */
  requestInit?: RequestInit
  /**
   * URL 参数
   */
  params?: {
    [key: string]: string
  }
}

export async function GET<T = any>(url: string, options: GETOptions = {}) {
  const requestInit: RequestInit = {
    headers: new Headers({
      //  access_token
      Authorization: options.noAuthorization ? '' : await getAccessToken(),
      ...options.headers,
    }),
    // credentials: "include",
    ...options.requestInit,
  }

  const queryStr = options.params ? `?${encodeParams(options.params)}` : ''

  return await cc98Fetch<T>(url + queryStr, requestInit)
}

type DELETEOptions = GETOptions

export async function DELETE<T = any>(url: string, options: DELETEOptions = {}) {
  const requestInit: RequestInit = {
    method: "DELETE",
    headers: new Headers({
      //  access_token
      Authorization: options.noAuthorization ? '' : await getAccessToken(),
      ...options.headers,
    }),
    // credentials: "include",
    ...options.requestInit,
  }

  const queryStr = options.params ? `?${encodeParams(options.params)}` : ''

  return await cc98Fetch<T>(url + queryStr, requestInit)
}

interface POSTOptions {
  /**
   * 标识不携带 access_token，默认携带
   */
  noAuthorization?: true
  /**
   * headers 参数，默认 Content-Type: application/json
   */
  headers?: Headers | string[][] | Record<string, string>
  /**
   * 其他请求参数
   */
  requestInit?: RequestInit
  /**
   * 参数，默认转为 json
   */
  params?: any
}

export async function POST<T = any>(url: string, options: POSTOptions = {}) {
  const requestInit: RequestInit = {
    method: 'POST',
    headers: new Headers({
      //  access_token
      Authorization: options.noAuthorization ? '' : await getAccessToken(),
      'Content-Type': 'application/json',
      ...options.headers,
    }),
    body: options.params && JSON.stringify(options.params),
    ...options.requestInit,
  }

  return await cc98Fetch<T>(url, requestInit)
}

type PUTOptions = POSTOptions

export async function PUT<T = any>(url: string, options: PUTOptions = {}) {
  const requestInit: RequestInit = {
    method: 'PUT',
    headers: new Headers({
      //  access_token
      Authorization: options.noAuthorization ? '' : await getAccessToken(),
      'Content-Type': 'application/json',
      ...options.headers,
    }),
    body: options.params && JSON.stringify(options.params),
    ...options.requestInit,
  }

  return await cc98Fetch<T>(url, requestInit)
}

/**
 * just like $.param
 */
function encodeParams(params: { [key: string]: string }) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
}

/**
 * 使用refresh_token获取token
 * @param {string} refreshToken
 * @return {Promise<Try<Token, FetchError>>}
 */
async function getTokenByRefreshToken(refreshToken: string): Promise<Try<Token, FetchError>> {
  const requestBody = {
    client_id: '9a1fd200-8687-44b1-4c20-08d50a96e5cd',
    client_secret: '8b53f727-08e2-4509-8857-e34bf92b27f2',
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }

  const response = await fetch(host.state.oauth, {
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

  return Try.of<Token, FetchError>(Success.of(await response.json()))
}

/**
 * 从本地取得 access_token，如果过期尝试刷新
 */
export async function getAccessToken(): Promise<string> {
  const accessToken = getLocalStorage('access_token')

  if(!accessToken) {
    const refreshToken = getLocalStorage('refresh_token') as string
    if(!refreshToken) return ''
    const token = await getTokenByRefreshToken(refreshToken)
    return new Promise((resolve, reject) => {
      token
        .fail(error => reject(error)) // TODO: 添加refresh token过期的处理
        .succeed(newToken => {
          const access_token = `${newToken.token_type} ${newToken.access_token}`
          setLocalStorage('access_token', access_token, newToken.expires_in)
          // refresh_token 有效期一个月
          setLocalStorage('refresh_token', newToken.refresh_token, 2592000)
          resolve(access_token)
        })
    }) as Promise<string>
  }

  return `${accessToken}`
}

interface Token {
  access_token: string
  expires_in: number
  refresh_token: string
  token_type: string
}

/**
 * 登录
 */
export async function logIn(username: string, password: string): Promise<Try<Token, FetchError>> {
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

  const response = await fetch(host.state.oauth, {
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

  return Try.of<Token, FetchError>(Success.of(await response.json()))
}
