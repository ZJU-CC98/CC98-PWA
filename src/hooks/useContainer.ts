/* tslint:disable */
import { useState, useEffect, useRef } from 'react'

declare global {
  interface Window {
    __$$GLOBAL_STATE_: {
      [key: string]: Object
    }
  }
}

// Prepare for debug tools
window.__$$GLOBAL_STATE_ = {}

type Listener = () => void

export class Container<State extends Object = {}> {
  namespace: string

  state: State
  _listeners: Listener[] = []

  construtor() {
    window.__$$GLOBAL_STATE_.namespace = this.state
  }

  _subscribe(fn: Listener) {
    this._listeners.push(fn)
  }

  _unsubscribe(fn: Listener) {
    const listeners = this._listeners
    listeners.splice(listeners.indexOf(fn), 1)
  }

  updator<T>(updateFunc: () => T, shouldUpdate = true) {
    const retValue = updateFunc()
    if (shouldUpdate) {
      this._listeners.forEach(listener => listener())
    }

    return retValue
  }
}

/**
 * 注入一个全局 Container
 * @param containerInstance 全局 container 实例
 */
export function useGlobalContainer<State>(containerInstance: Container<State>) {
  const [updateCount, setUpdateCount] = useState(0)
  const forceUpdate = useRef(() => setUpdateCount(updateCount + 1))

  useEffect(() => {
    containerInstance._subscribe(forceUpdate.current)
    return () => containerInstance._unsubscribe(forceUpdate.current)
  }, [])

  return containerInstance
}
