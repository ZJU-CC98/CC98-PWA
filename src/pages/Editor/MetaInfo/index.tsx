import React from 'react'
import styled from 'styled-components'

import useContainer from '@/hooks/useContainer'
import { MetaInfoContainer } from './MetaInfoContainer'

import { InputBase } from '@material-ui/core'

const InputArea = styled(InputBase).attrs({
  fullWidth: true,
})`
  && {
    margin-top: 8px;
    padding: 4px 8px;
    border: 1.5px solid #ccc;
  }
`

export { MetaInfoContainer }

interface Props {
  container: MetaInfoContainer
}

export default ({ container }: Props) => {
  useContainer(container)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    container.setTitle(event.target.value)
  }

  return <InputArea value={container.state.title} placeholder="标题" onChange={onTitleChange} />
}
