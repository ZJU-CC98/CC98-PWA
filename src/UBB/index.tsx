import React from 'react'

import { Typography } from '@material-ui/core'
import settingModel from '@/models/setting'

import ubbReact from './ubbReact'
import { IContext } from '@cc98/context'

const context: Partial<IContext> = {
  theme: settingModel.state.theme,
}

settingModel._subscribe((prev, next) => {
  if (prev.theme !== next.theme) {
    context.theme = next.theme
  }
})

interface Props {
  ubbText: string
}

const UBB = React.memo((props: Props) => (
  <Typography component="div">{ubbReact(props.ubbText, context)}</Typography>
))

const UBBReact = (ubbText: string) => ubbReact(ubbText, context)

export { UBB as default, UBBReact }
