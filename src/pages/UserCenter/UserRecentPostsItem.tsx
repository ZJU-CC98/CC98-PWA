import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from '@/utils/history'

import { ListItem, Typography } from '@material-ui/core'

import { IPost } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import dayjs from 'dayjs'

const ListItemS = styled(ListItem)`
  && {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
  }
`

const TitleArea = styled.div`
  max-width: 80%;
  flex-grow: 1;
`

const InfoArea = styled.div`
  width: 70px;
  flex-shrink: 0;
  text-align: right;
`

const Title = styled(Typography)`
  && {
    /* 多行截断，兼容性不好 */
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    line-height: 1.25;
  }
`

const SubTitle = styled(Typography)`
  && {
    margin-top: 3px;
  }
`

const Info = SubTitle

/**
 * 布局：
 * title           info1
 * subtitle        info2
 */
interface ItemProps {
  title: string
  subtitle: string
  info1: string
  info2: string
  onClick: () => void
}

export const PostItem: React.FC<ItemProps> = ({ onClick, title, subtitle, info1, info2 }) => (
  <ListItemS button divider onClick={onClick}>
    <TitleArea>
      <Title variant="subtitle1">{title}</Title>
      <SubTitle color="textSecondary">{subtitle}</SubTitle>
    </TitleArea>

    <InfoArea>
      <Info color="textSecondary">{info1}</Info>
      <Info color="textSecondary">{info2}</Info>
    </InfoArea>
  </ListItemS>
)

interface Props {
  data: IPost
}

export default ({ data }: Props) => {
  const [boardName, setBoardName] = useState('')
  useEffect(() => {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [])

  const title = data.content
  const subtitle = boardName
  const info1 = dayjs(data.time).fromNow()
  const info2 = `楼层: ${data.floor}`

  return (
    <PostItem
      onClick={() => navigate(`/topic/${data.topicId}#${data.floor}`)}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
    />
  )
}