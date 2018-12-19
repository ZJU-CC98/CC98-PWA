import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, FilledInput } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
const Root = styled.div`
  display: flex;
  width: 100%;
`
const MyFilledInput = styled(FilledInput).attrs({
  id: 'chatInput',
})`
  width: 100%;
`
const MyIconButton = styled(IconButton)`
  && {
    position: absolute;
    right: 0px;
    bottom: 0px;
  }
`
interface Props {
  callback: (content: string) => void
}
export default ({ callback }: Props) => {
  const [content, setContent] = useState<string>('')
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(event.target.value)
  }

  return (
    <Root>
      <MyFilledInput onChange={handleInputChange} value={content} />
      <MyIconButton>
        <SendIcon onClick={() => callback(content)} />
      </MyIconButton>
    </Root>
  )
}
