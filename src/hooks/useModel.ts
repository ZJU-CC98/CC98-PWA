import { useState, useEffect } from 'react'

type Listener<T> = (prevState: T, nextState: T) => void

export class Model<State extends object = {}> {
  // namespace: string
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
 * @param props 用于比较的 keys, 用于避免不必要的重渲染
 */
export default function useModel<S extends object, K extends keyof S>(
  model: Model<S>,
  props: K[]
): S

/**
 * 订阅一个 model
 * @param model model 实例
 * @param shouldUpdate 比较函数，用于避免不必要的重渲染
 */
export default function useModel<S extends object>(
  model: Model<S>,
  shouldUpdate?: (prevState: S, nextState: S) => boolean
): S

export default function useModel<S extends object, K extends keyof S>(
  model: Model<S>,
  comparator?: ((prevState: S, nextState: S) => boolean) | K[]
): S {
  const setUpdateTime = useState(0)[1]

  useEffect(() => {
    const shouldUpdateFunc = (prevState: S, nextState: S) => {
      if (comparator === undefined) {
        return true
      }

      // comparator: (prevState: S, nextState: S) => boolean
      if (typeof comparator === 'function') {
        return !comparator(prevState, nextState)
      }

      // comparator: K[]
      for (let i = 0; i < comparator.length; i++) {
        const prop = comparator[i]

        if (prevState[prop] !== nextState[prop]) {
          return true
        }
      }

      return false
    }

    const listener: Listener<S> = (prevState, nextState) => {
      if (shouldUpdateFunc(prevState, nextState)) {
        // shouldUpdate 返回 false 就避免 rerender
        return
      }

      setUpdateTime(prev => prev + 1)
    }

    model._subscribe(listener)

    return () => {
      model._unsubscribe(listener)
    }
  }, [model, comparator])

  return model.state
}
