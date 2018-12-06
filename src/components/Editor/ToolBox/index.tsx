import React from 'react'
import styled from 'styled-components'

import { IEditorHandler } from '../useEditorHandler'

import { IconButton } from '@material-ui/core'

import PhotoIcon from '@material-ui/icons/Photo'
import DeleteIcon from '@material-ui/icons/Delete'
import SendIcon from '@material-ui/icons/Send'
import TagFacesIcon from '@material-ui/icons/TagFaces'
import Autorenew from '@material-ui/icons/Autorenew'

import { uploadPicture } from '@/services/editor'

const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

interface Props {
  handler: IEditorHandler
}

export default ({ handler }: Props) => {
  function pictureHandler() {
    uploadPicture().then(res =>
      res.fail().succeed(picURL => {
        handler.attach(`[img]${picURL}[/img]`)
      })
    )
  }

  function deleteHandler() {
    handler.clear()
    handler.detachAll()
  }

  function sendHandler() {
    const content = handler.mainContent + handler.attachments.join('')

    // onSend(content)
  }

  return (
    <WrapperDiv>
      <div>
        <IconButton>
          <PhotoIcon onClick={pictureHandler} />
        </IconButton>
        <IconButton>
          <TagFacesIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={deleteHandler} />
        </IconButton>
      </div>
      <div>
        <IconButton>
          <Autorenew />
        </IconButton>
        <IconButton>
          <SendIcon onClick={sendHandler} />
        </IconButton>
      </div>
    </WrapperDiv>
  )
}
