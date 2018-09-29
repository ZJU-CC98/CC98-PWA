import { getLocalStorage } from './storage'

interface Either<Left = {
  status: number,
  msg: string,
}, Right = any> {
  Left: Left
  Right: Right
}

async function cc98Fetch<T>(url: string, init: RequestInit) {
  const baseUrl = "https://api-v2.cc98.org"
  const requestURL = `${baseUrl}/${url}`

  // console.log("Fetch: " + requestURL)
  const response = await fetch(requestURL, init)

  return await response.json() as T

  // if (response.status === 200) {
  //   return await response.json() as T
  // }
  // else {
  //   return {
  //     status: response.status,
  //     msg: await response.text()
  //   }
  // }
}

export async function GET<T = any>(url: string, init?: RequestInit) {

  // TODO: refresh access_token

  const requestInit: RequestInit = {
    headers: new Headers({
      Authorization: `bearer ${getLocalStorage('access_token')}`,
    }),
    ...init,
    // credentials: "include",
  }

  // const queryStr = !params
  //   ? ''
  //   : '?' + Object.keys(params).map((key) => {
  //       return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  //     }).join('&')

  return await cc98Fetch<T>(url, requestInit)
}
