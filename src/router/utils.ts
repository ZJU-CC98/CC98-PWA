/**
 * 将函数触发限定在某一路由下（配合事件绑定用）
 * @param func 待绑定函数
 * @param href 路由
 */
export const bindURL = (func: () => void, href: string) => () => {
  if (window.location.href === href) {
    func()
  }
}

export class ScrollDom {
  _scrollDom?: HTMLElement
  _bindFunc?: () => void

  set scrollDom(dom: HTMLElement) {
    if (this._bindFunc) {
      dom.onscroll = this._bindFunc
    }

    this._scrollDom = dom
  }

  set bindFunc(func: () => void) {
    if (this._scrollDom) {
      this._scrollDom.onscroll = func
    }

    this._bindFunc = func
  }
}

export const globalScrollMap = new Map<string, ScrollDom>()
