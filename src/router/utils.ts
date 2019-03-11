/**
 * 将函数触发限定在某一路由下（配合事件绑定用）
 * @param func 待绑定函数
 * @param href 路由
 */
export function bindURL(func: Function, href: string) {
  return () => {
    if (window.location.href === href) {
      func()
    }
  }
}
