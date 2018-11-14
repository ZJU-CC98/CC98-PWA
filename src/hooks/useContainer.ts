/* tslint:disable */
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    __$$GLOBAL_STATE_: {
      [key: string]: object
    }
  }
}

// Prepare for debug tools
window.__$$GLOBAL_STATE_ = {}

type Listener = () => void
type UpdateFunc = () => void | boolean | Promise<void> | Promise<boolean>

export class Container<State extends object = {}> {
  namespace: string

  state: State
  _listeners: Listener[] = []

  _attachToGlobal() {
    window.__$$GLOBAL_STATE_[this.namespace] = this.state
  }

  _subscribe(fn: Listener) {
    this._listeners.push(fn)
  }

  _unsubscribe(fn: Listener) {
    const listeners = this._listeners
    listeners.splice(listeners.indexOf(fn), 1)
  }

  /**
   * Update the state
   * @param updateFunc 更新状态的函数
   */
  update = (updateFunc: UpdateFunc) => {
    return Promise.resolve<void | boolean>(updateFunc()).then(shouldBroadcast => {
      if (!(shouldBroadcast === false)) return
      this._listeners.forEach(listener => listener())
    })
  }

  /**
   * Return a func which can update the state
   */
  updator = (updateFunc: UpdateFunc) => {
    return () => this.update(updateFunc)
  }
}

/**
 * 注入一个全局 Container
 * @param containerInstance 全局 container 实例
 */
export function useGlobalContainer<T extends Container>(containerInstance: T) {
  const forceUpdate = useState(null)[1]

  useEffect(() => {
    const listener = () => forceUpdate(null)
    containerInstance._subscribe(listener)

    return () => containerInstance._unsubscribe(listener)
  }, [])

  return containerInstance
}
