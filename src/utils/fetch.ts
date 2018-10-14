import { getLocalStorage } from './storage'

class Success<T> {
  of() {

  }
}

class Failure<T> {
  of() {

  }
}

class Try<S, F> {

  isSuccess: boolean
  _value: Success<S> | Failure<F>

  of() {

  }

  success() {

  }

  fail() {

  }

  defaultErrorHandle() {

  }
}



async function cc98Fetch<T>(url: string, init: RequestInit) {
  // const baseUrl = "https://apitest.niconi.cc"
  const baseUrl = "https://api-v2.cc98.org"
  const requestURL = `${baseUrl}/${url}`

  // console.log("Fetch: " + requestURL)
  const response = await fetch(requestURL, init)

  if (response.status !== 200) {
    // TODO:

    // return Try.of(Failure.of({}))
  }

  return await response.json() as T
}


interface GETOptions {
  /**
   * 是否需要携带 token
   */
  authorization: boolean
  /**
   * headers 参数（需要 Authorization 请设置 authorization = true）
   */
  headers: Headers | string[][] | Record<string, string>
  /**
   * 其他请求参数
   */
  requestInit?: RequestInit
  /**
   * URL 参数
   */
  params: {
    [key: string]: string
  }
}

export async function GET<T = any>(url: string, options?: GETOptions) {

  const headers: GETOptions["headers"] = {}
  if (options && options.authorization) {
    const accessToken = getLocalStorage('access_token')
    // TODO: if need refresh access_token

    headers.Authorization = `bearer ${accessToken}`
  }


  const requestInit: RequestInit = {
    headers: new Headers({
      ...headers,
      ...(options && options.headers)
    }),
    ...(options && options.requestInit),
    // credentials: "include",
  }

  let queryStr = ''
  if (options && options.params) {
    const params = options.params
    queryStr = '?' + Object.keys(params).map((key) => (
      encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )).join('&')
  }

  return await cc98Fetch<T>(url + queryStr, requestInit)
}


// export async function POST<T = any>() {

// }
