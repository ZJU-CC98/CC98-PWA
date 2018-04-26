
export function logIn() {

  const param = {
    client_id: "d3c6b528-1eb1-4bf3-8f39-08d5b8a11569",
    // redirect_uri: "http://localhost:8080/login",
    redirect_uri: "http://cc98.dustdown.cn/login",
    response_type: "token",
    scope: "cc98-api",
    state: ""
  }

  const URL = 'https://openid.cc98.org/connect/authorize?'
    + Object.keys(param).map(key =>
      `${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`
    ).join('&')

  window.location.href = URL
}

