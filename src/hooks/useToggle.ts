/* tslint:disable */
import { useState } from 'react'

interface ToggleFuncs {
  trueFunc: Function
  falseFunc: Function
}

export default function useToggle(init: boolean, funcs: ToggleFuncs) {
  const [bool, setBool] = useState(init)

  const toggleFunc = () => {
    if (bool) {
      // TODO: check return & loading
      funcs.trueFunc()
      setBool(false)
    } else {
      funcs.falseFunc()
      setBool(true)
    }
  }

  return [bool, toggleFunc] as [typeof bool, typeof toggleFunc]
}
