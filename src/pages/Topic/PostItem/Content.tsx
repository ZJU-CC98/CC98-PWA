import React from 'react'
import styled from 'styled-components'

import { IPost } from '@cc98/api'

import UBB from '@/UBB'
import remark from 'remark'
import remark2react from 'remark-react'

function Markdown(content: string) {
  return remark()
    .use(remark2react)
    .processSync(content).contents
}

const UBBDiv = styled.div`
  margin: 12px 16px;
  margin-bottom: 4px;

  /* for <img> in markdown */
  img {
    max-width: 100%;
  }
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
}

export default ({ postInfo }: Props) => {
  const content =
    postInfo.contentType === 0 ? <UBB ubbText={postInfo.content} /> : Markdown(postInfo.content)

  return <UBBDiv>{content}</UBBDiv>
}
