import React, { useState } from 'react'
import styled from 'styled-components'

import { IconButton, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'

const MyIconButton = styled(IconButton)`
  && {
    position: relative;
    margin-right: -12px;
    margin-bottom: -2px;
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

  const handleSend = () => {
    callback(content)
  }

  return (
    <TextField
      label="私信内容"
      variant="filled"
      fullWidth
      value={content}
      onChange={handleInputChange}
      InputProps={{
        endAdornment: (
          <MyIconButton>
            <SendIcon onClick={handleSend} />
          </MyIconButton>
        ),
      }}
    />
  )
}
