/**
 * @author dongyansong
 * @see {@link https://gist.github.com/xiaoxiangmoe/edc5c1674b0ec273f0be9e2f323f90dc}
 * @date 2018-11-05
 */
import * as React from 'react'

declare module 'react' {
  function useState<T>(initialState: T | (() => T)): [T, (newState: T) => void]
  function useEffect(
    create: () => void | Promise<void> | (() => void) | Promise<() => void>,
    inputs?: ReadonlyArray<unknown>
  ): void
  function useContext<T>(foo: React.Context<T>): T
  function useReducer<S, A>(
    reducer: (state: S, action: A) => S,
    initialState: S
  ): [S, (action: A) => void]
  function useCallback<F extends (...args: never[]) => unknown>(
    callback: F,
    inputs?: ReadonlyArray<unknown>
  ): F
  function useMemo<T>(create: () => T, inputs?: ReadonlyArray<unknown>): T
  function useRef<T extends unknown>(initialValue?: T): React.RefObject<T>
  function useImperativeMethods<T>(
    ref: React.Ref<T>,
    createInstance: () => T,
    inputs?: ReadonlyArray<unknown>
  ): void
  const useMutationEffect: typeof useEffect
  const useLayoutEffect: typeof useEffect
}
