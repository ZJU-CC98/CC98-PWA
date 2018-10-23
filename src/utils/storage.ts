/**
 * 在 localStorage 中存储一个键值对
 * @param key key
 * @param value value
 * @param expireIn 有效期，单位 s
 */
export function setLocalStorage(key: string, value: string | object, expireIn = 0): void {
  localStorage.setItem(
    key,
    typeof value === 'object' ? `obj-${JSON.stringify(value)}` : `str-${value}`
  )

  // 设置有效期
  if (expireIn > 0) {
    const expirationTime = Date.now() + expireIn * 1000
    localStorage.setItem(`${key}_expirationTime`, `${expirationTime}`)
  } else {
    localStorage.removeItem(`${key}_expirationTime`)
  }
}

/**
 * 从 localStorage 中取出一个值，过期的值会被清除
 */
export function getLocalStorage(key: string): string | object | null {
  const value = localStorage.getItem(key)
  const expirationTime = localStorage.getItem(`${key}_expirationTime`)

  // 存储的值已经过期
  if (expirationTime && Date.now() > parseInt(expirationTime, 10)) {
    localStorage.removeItem(key)
    return null
  }

  if (!value) {
    return null
  }

  return value.startsWith('obj-') ? JSON.parse(value.slice(4)) : value.slice(4)
}

/**
 * 从 localStorage 中删除一个值，对应的 ${key}_expirationTime 也会被删除
 */
export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key)
  localStorage.removeItem(`${key}_expirationTime`)
}
