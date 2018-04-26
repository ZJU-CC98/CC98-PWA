export function debounce(func, delay: number) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => func(args), delay)
  }
}
