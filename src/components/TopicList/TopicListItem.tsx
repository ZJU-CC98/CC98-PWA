import React, { useState } from 'react'
import styled from 'react-emotion'
import { navigate } from '@/utils/history'

import { ListItem, Typography } from '@material-ui/core'

import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import dayjs from 'dayjs'

const Item = styled(ListItem)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
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
  /* 多行截断，兼容性不好 */
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  line-height: 1.25;
`

const SubTitle = styled(Typography)`
  margin-top: 3px;
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

export const TopicItem: React.FunctionComponent<ItemProps> = ({
  onClick,
  title,
  subtitle,
  info1,
  info2,
}) => (
  <Item button divider onClick={onClick}>
    <TitleArea>
      <Title variant="subtitle1">{title}</Title>
      <SubTitle color="textSecondary">{subtitle}</SubTitle>
    </TitleArea>

    <InfoArea>
      <Info color="textSecondary">{info1}</Info>
      <Info color="textSecondary">{info2}</Info>
    </InfoArea>
  </Item>
)

export type Place = 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search' | 'hot'

interface Props {
  data: ITopic
  place: Place
}

export default ({ data, place }: Props) => {
  const [boardName, setBoardName] = useState('')

  function getBoardName() {
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }

  const title = data.title
  let subtitle = data.userName ? data.userName : '[匿名]'
  let info1 = dayjs(data.lastPostTime).fromNow()
  let info2 = `回帖: ${data.replyCount}`

  switch (place) {
    case 'usercenter':
      if (!boardName) {
        getBoardName()
      }
      subtitle = boardName
      break

    case 'hot':
      if (!boardName) {
        getBoardName()
      }
      info1 = boardName
      break

    case 'newtopic':
      info1 = dayjs(data.time).fromNow()
    case 'follow':
    case 'search':
      if (!boardName) {
        getBoardName()
      }
      info2 = boardName
      break

    // case 'inboard':
  }

  return (
    <TopicItem
      onClick={() => navigate(`/topic/${data.id}`)}
      title={title}
      subtitle={subtitle}
      info1={info1}
      info2={info2}
    />
  )
}
