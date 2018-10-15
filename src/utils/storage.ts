
// TODO: cache data like access_token globally ?

export function setLocalStorage(key: string, value: string | object, expireIn = 0): void {
  localStorage.setItem(
    key,
    typeof value === 'object'
      ? `obj-${JSON.stringify(value)}`
      : `str-${value}`
  )

  // 设置有效期
  if (expireIn > 0) {
    const expirationTime = Date.now() + expireIn * 1000
    localStorage.setItem(`${key}_expirationTime`, `${expirationTime}`)
  } else {
    localStorage.removeItem(`${key}_expirationTime`)
  }
}

export function getLocalStorage(key: string): string | object | null {
  const value = localStorage.getItem(key)
  const expirationTime = localStorage.getItem(`${key}_expirationTime`)

  // 存储的值已经过期
  if (expirationTime && Date.now() > parseInt(expirationTime)) {
    localStorage.removeItem(key)
    return null
  }

  if (!value) {
    return null
  }

  return value.startsWith('obj-')
    ? JSON.parse(value.slice(4))
    : value.slice(4)
}
