import React from 'react'
import styled from 'styled-components'

import { EditorContainer } from '../EditorContainer'

import PictureBtn from './PictureBtn'
import StickerBtn from './StickerBtn'
import ClearBtn from './ClearBtn'
import PreviewBtn from './PreviewBtn'
import SendBtn from './SendBtn'
import StickerBox from './StickerBox'
const WrapperDiv = styled.div`
  display: flex;
  justify-content: space-between;
`
const WrapperToolBox = styled.div`
  display: flex;
  flex-direction: column;
`
interface Props {
  editor: EditorContainer
  onSendCallback: () => void
}

export default ({ editor, onSendCallback }: Props) => (
  <WrapperToolBox>
    {editor.state.stickerDisplay && <StickerBox editor={editor} />}
    <WrapperDiv>
      <div>
        <PictureBtn editor={editor} />
        <StickerBtn editor={editor} />
      </div>
      <div>
        <ClearBtn editor={editor} />
        <PreviewBtn editor={editor} />
        <SendBtn onSendCallback={onSendCallback} />
      </div>
    </WrapperDiv>
  </WrapperToolBox>
)
