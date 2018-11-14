/* tslint:disable */
import { useState, useEffect } from 'react'

type Listener = () => void

export class Container<State extends object = {}> {
  namespace: string
  state: Readonly<State>
  _listeners: Listener[] = []

  _subscribe(fn: Listener) {
    this._listeners.push(fn)
  }

  _unsubscribe(fn: Listener) {
    const listeners = this._listeners
    listeners.splice(listeners.indexOf(fn), 1)
  }

  /**
   * just like setState in react
   * @param state_or_updater
   * @param callback
   */
  setState<K extends keyof State>(
    updater:
      | ((prevState: Readonly<State>) => Pick<State, K> | State | null)
      | (Pick<State, K> | State | null),
    callback?: () => void
  ): Promise<void> {
    return Promise.resolve().then(() => {
      let nextState: Pick<State, K> | State | null

      if (typeof updater === 'function') {
        nextState = (updater as Function)(this.state)
      } else {
        nextState = updater
      }

      // (v == null) equal to (v === null || v === undefined)
      // this will prevent broadcast
      if (nextState == null) {
        if (callback) callback()
        return
      }

      this.state = Object.assign({}, this.state, nextState)

      const promises = this._listeners.map(listener => listener())

      return Promise.all(promises).then(() => {
        if (callback) {
          return callback()
        }
      })
    })
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
