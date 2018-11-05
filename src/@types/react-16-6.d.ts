/**
 * @author dongyansong
 * @see {@link https://gist.github.com/xiaoxiangmoe/edc5c1674b0ec273f0be9e2f323f90dc}
 * @date 2018-11-05
 */
import * as React from 'react'

declare module 'react' {
  function memo<P>(
    Component: React.SFC<P>,
    propsAreEqual?: ((
      prevProps: Readonly<P & { children?: ReactNode }>,
      nextProps: Readonly<P & { children?: ReactNode }>
    ) => boolean)
  ): React.SFC<P>
  // tslint:disable-next-line
  function lazy<T extends () => Promise<{ default: React.ComponentType<any> }>>(
    importFunction: T
  ): T extends () => Promise<{ default: React.ComponentType<infer P> }>
    ? React.ComponentType<P>
    : React.ComponentType
}
