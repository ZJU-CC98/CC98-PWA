import { getLocalStorage } from './storage'
import { BlockOverflowProperty } from 'csstype';

async function cc98Fetch(url: string, init: RequestInit) {
  const baseUrl = "https://api-v2.cc98.org"
  const requestURL = `${baseUrl}/${url}`

  // console.log("Fetch: " + requestURL)
  const response = await fetch(requestURL, init)
  return await response.json()
}

export async function GET(url: string, init?: RequestInit) {

  const requestInit: RequestInit = {
    headers: new Headers({
      Authorization: "bearer " + getLocalStorage('access_token')
    }),
    ...init,
    // credentials: "include",
  }

  // const queryStr = !params
  //   ? ''
  //   : '?' + Object.keys(params).map((key) => {
  //       return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  //     }).join('&')

  return await cc98Fetch(url, requestInit)
}
