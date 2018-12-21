import React from 'react'
import UBBCore from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import { IContext } from '@cc98/context'

import './style.css'

const defaultContext: IContext = {
  theme: 'light',
  imgBaseURL: 'https://www.cc98.org/static/images',
}

export default function UBBReact(ubbText: string, context?: Partial<IContext>) {
  return UBBCore<React.ReactNode>(ubbText, handlerHub, {
    ...defaultContext,
    ...context,
  })
}
