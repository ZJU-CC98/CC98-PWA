/* tslint:disable */
/**
 * Functor Try
 */

export class Success<T> {
  _value: T

  constructor(init: T) {
    this._value = init
  }

  static of<T>(init: T) {
    return new Success(init)
  }

  map<U>(func: (x: T) => U) {
    return Success.of(func(this._value))
  }

  value() {
    return this._value
  }
}

export class Failure<T> {
  _value: T

  constructor(init: T) {
    this._value = init
  }

  static of<T>(init: T) {
    return new Failure(init)
  }

  /**
   * Failure 的 map 不作任何处理
   */
  map(_: (x: T) => T): Failure<T> {
    // return Failure.of(this._value)
    return this
  }

  value() {
    return this._value
  }
}

/**
 * Try 函子，98 错误处理定制版
 */
export class Try<S, F> {
  _value: Success<S> | Failure<F>
  /**
   * 标识是否已经进行过 fail 处理
   */
  _hasHandleErr: boolean = false

  constructor(init: Success<S> | Failure<F>) {
    this._value = init
  }

  static of<S, F>(init: Success<S> | Failure<F>) {
    return new Try<S, F>(init)
  }

  // static get[Symbol.species]() {
  //   return this
  // }

  /**
   * Try 函子的 map
   * @param func 类型签名 S -> U
   */
  map<U>(func: (x: S) => U) {
    if (this._value.constructor === Success) {
      return Try.of<U, F>((this._value as Success<S>).map(func))
    } else {
      return Try.of<U, F>((this._value as Failure<F>).map(id => id))
    }
  }

  // some methods not fp but useful

  /**
   * 是否成功
   */
  isSuccess() {
    return this._value.constructor === Success
  }

  /**
   * 成功回调
   */
  succeed(func: (x: S) => void) {
    // force handle error before get value
    if (!this._hasHandleErr) {
      throw new Error('[Try] You must use `fail` to handle error first.')
    }

    if (this._value.constructor === Success) {
      func((this._value as Success<S>).value())
    }
  }

  /**
   * 错误处理
   */
  fail(errHandleFunc?: (x: F) => void) {
    this._hasHandleErr = true

    if (this._value.constructor === Failure) {
      errHandleFunc && errHandleFunc((this._value as Failure<F>).value())
    }

    return this
  }
}
