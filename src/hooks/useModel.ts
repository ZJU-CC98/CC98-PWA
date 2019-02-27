import { useState, useEffect } from 'react'

type Listener<T> = (prevState: T, nextState: T) => void

export class Model<State extends object = {}> {
  namespace: string
  state: Readonly<State>
  _prevState: Readonly<State>

  _listeners: Listener<State>[] = []

  _subscribe(fn: Listener<State>) {
    this._listeners.push(fn)
  }

  _unsubscribe(fn: Listener<State>) {
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
  ) {
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

      return Promise.resolve()
    }

    this._prevState = this.state
    this.state = Object.assign({}, this.state, nextState)

    const promises = this._listeners.map(listener => listener(this._prevState, this.state))

    return Promise.all(promises).then(() => {
      if (callback) {
        return callback()
      }
    })
  }
}

/**
 * 订阅一个 model
 * @param model model 实例
 * @param shouldUpdate 用于避免不必要的重渲染
 */
export default function useModel<M extends Model>(
  model: M,
  shouldUpdate?: (prevState: M['state'], nextState: M['state']) => boolean
) {
  const updateCount = useState(0)[1]

  useEffect(() => {
    const listener: Listener<M['state']> = (prevState, nextState) => {
      if (shouldUpdate && !shouldUpdate(prevState, nextState)) {
        // shouldUpdate(...) === false 就避免 rerender
        return
      }

      updateCount(prev => prev + 1)
    }

    model._subscribe(listener)

    return () => {
      model._unsubscribe(listener)
    }
  }, [model, shouldUpdate])

  return model
}
