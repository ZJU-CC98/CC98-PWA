import { IHandlerHub } from '@cc98/ubb-core'

import React from 'react'

import rootHandler from './rootHandler'
import specificTagHandlers from './specificTagHandlers/_index'
import generalTagHandlers from './generalTagHandlers/_index'
import defaultTagHandler from './defaultTagHandler'
import textHandler from './textHandler'

const handlerHub: IHandlerHub<React.ReactNode> = {
  rootHandler,

  specificTagHandlers,

  generalTagHandlers,

  defaultTagHandler,

  textHandler,
}

export default handlerHub
