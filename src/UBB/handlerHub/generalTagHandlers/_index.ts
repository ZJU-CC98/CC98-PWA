import { IHandlerHub } from '@cc98/ubb-core'

import React from 'react'

import ac from './ac'
import em from './em'
import mahjong from './mahjong'
import ms from './ms'
import tb from './tb'

import line from './line'

const generalTagHandlers: IHandlerHub<React.ReactNode>['generalTagHandlers'] = [
  ac,
  em,
  mahjong,
  ms,
  tb,

  // tag without close
  line,
]

export default generalTagHandlers
