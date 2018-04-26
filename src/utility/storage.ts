export function setLocalStorage(key: string, value: object | string, expireIn = 0) {
    let v = value;
    if (typeof v == 'object') {
        v = JSON.stringify(v);
        v = `obj-${v}`;
    } else {
        v = `str-${v}`;
    }
    localStorage.setItem(key, v);

    if (expireIn !== 0) {
        const now = Date.now();
        const expirationTime = now + expireIn * 1000;
        localStorage.setItem(`${key}_expirationTime`, `${expirationTime}`);
    } else {
        localStorage.removeItem(`${key}_expirationTime`);
    }
}

export function getLocalStorage(key: string) {
  let v = localStorage.getItem(key);
  const expirationTime = localStorage.getItem(`${key}_expirationTime`);
  if (expirationTime) {
      const now = Date.now();
      const time = Number.parseInt(expirationTime);
      if (now > time) {
          localStorage.removeItem(key);
          return;
      }
  }

  if (!v) {
      return;
  }
  if (v.startsWith('obj-')) {
      v = v.slice(4);
      return JSON.parse(v);
  } else if (v.startsWith('str-')) {
      return v.slice(4);
  }
}
