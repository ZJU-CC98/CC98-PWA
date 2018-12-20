import React from 'react'

import { Typography } from '@material-ui/core'
import settingInstance from '@/containers/setting'

import UBBReact from './ubb'

const options = {
  theme: settingInstance.state.theme,
}

interface Props {
  ubbText: string
}

const UBB = (props: Props) => (
  <Typography component="div">{UBBReact(props.ubbText, options)}</Typography>
)

export default React.memo(UBB)
