export function OAuth() {
  const query = {
    client_id: "d3c6b528-1eb1-4bf3-8f39-08d5b8a11569",
    redirect_uri: process.env.NODE_ENV !== 'production'
      ? "http://localhost:8000/login"
      : "http://cc98.dustdown.cn/login",
    response_type: "token",
    scope: "cc98-api",
    state: ""
  }

  const url = 'https://openid.cc98.org/connect/authorize?'
    + Object.keys(query).map((key: keyof typeof query) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    ).join('&')

  window.location.href = url
}

