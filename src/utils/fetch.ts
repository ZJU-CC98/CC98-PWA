/* tslint:disable */
import { Try, Success, Failure } from './fp/Try'
import { getAccessToken } from './logIn'

import host from '@/config/host'

export interface FetchError {
  /**
   * http 状态码
   */
  status: number
  /**
   * 错误信息，取自 response.text()
   * TODO: 重新设计统一错误处理
   */
  msg: string
  /**
   * response 本体
   */
  response: Response
}

async function cc98Fetch<T>(url: string, init: RequestInit): Promise<Try<T, FetchError>> {
  const baseUrl = host.api
  const requestURL = `${baseUrl}/${url}`

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

  // FIXME: 修正 api
  let data = null

  try {
    data = await response.clone().json()
  } catch {
    console.warn(`FIX: ${requestURL} response.json() fail.`)
    data = await response.text()
  }

  return Try.of<T, FetchError>(Success.of(data))
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
  const headers: Record<string, string> = {}

  if (!options.noAuthorization) {
    const accessToken = await getAccessToken()
    if (accessToken) headers.Authorization = accessToken
  }

  const requestInit: RequestInit = {
    headers: new Headers({
      ...headers,
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
  const headers: Record<string, string> = {}

  if (!options.noAuthorization) {
    const accessToken = await getAccessToken()
    if (accessToken) headers.Authorization = accessToken
  }

  const requestInit: RequestInit = {
    method: 'POST',
    headers: new Headers({
      ...headers,
      ...(options.headers || {
        'Content-Type': 'application/json',
      }),
    }),
    body: options.params && JSON.stringify(options.params),
    ...options.requestInit,
  }

  return await cc98Fetch<T>(url, requestInit)
}

type PUTOptions = POSTOptions

export async function PUT<T = void>(url: string, options: PUTOptions = {}) {
  const headers: Record<string, string> = {}

  if (!options.noAuthorization) {
    const accessToken = await getAccessToken()
    if (accessToken) headers.Authorization = accessToken
  }

  const requestInit: RequestInit = {
    method: 'PUT',
    headers: new Headers({
      ...headers,
      ...(options.headers || {
        'Content-Type': 'application/json',
      }),
    }),
    body: options.params && JSON.stringify(options.params),
    ...options.requestInit,
  }

  return await cc98Fetch<T>(url, requestInit)
}

type DELETEOptions = GETOptions

export async function DELETE<T = void>(url: string, options: DELETEOptions = {}) {
  const headers: Record<string, string> = {}

  if (!options.noAuthorization) {
    const accessToken = await getAccessToken()
    if (accessToken) headers.Authorization = accessToken
  }

  const requestInit: RequestInit = {
    method: 'DELETE',
    headers: new Headers({
      ...headers,
      ...options.headers,
    }),
    ...options.requestInit,
  }

  return await cc98Fetch<T>(url, requestInit)
}

/**
 * just like $.param
 */
export function encodeParams(params: { [key: string]: string }) {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&')
}
