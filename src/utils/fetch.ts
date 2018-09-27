import { getLocalStorage } from './storage'

async function cc98Fetch<T>(url: string, init: RequestInit) {
  const baseUrl = "https://api-v2.cc98.org"
  const requestURL = `${baseUrl}/${url}`

  // console.log("Fetch: " + requestURL)
  const response = await fetch(requestURL, init)
  return await response.json() as T
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
