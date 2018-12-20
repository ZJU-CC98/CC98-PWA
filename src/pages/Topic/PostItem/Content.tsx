import React from 'react'
import styled from 'styled-components'

import settingInstance from '@/containers/setting'

import { Typography } from '@material-ui/core'

import { IPost } from '@cc98/api'

import UBB from '@/UBB'
import remark from 'remark'
import remark2react from 'remark-react'

function Markdown(content: string) {
  return remark()
    .use(remark2react)
    .processSync(content).contents
}

const TypographyS = styled(Typography).attrs({
  component: 'div',
})`
  && {
    margin: 12px 16px;
    margin-bottom: 4px;

    /* for <img> in markdown */
    img {
      max-width: 100%;
    }
  }
`

interface Props {
  /**
   * 帖子信息
   */
  postInfo: IPost
}

const theme = settingInstance.state.theme

export default ({ postInfo }: Props) => {
  const content =
    postInfo.contentType === 0 ? UBB(postInfo.content, { theme }) : Markdown(postInfo.content)

  return <TypographyS>{content}</TypographyS>
}
