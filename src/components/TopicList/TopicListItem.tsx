import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import muiStyled from '@/muiStyled'
import { navigate } from '@/utils/history'

import { ListItem, Typography } from '@material-ui/core'

import { ITopic } from '@cc98/api'
import { getBoardNameById } from '@/services/board'

import dayjs from 'dayjs'

const ListItemS = muiStyled(ListItem)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  width: '100%',
})

const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: 1em;
  text-align: right;
`

const Title = muiStyled(Typography).attrs({
  variant: 'subtitle2',
  color: 'textPrimary',
})({
  // marginTop: 3,
  // lineHeight: 1.25,
  flexGrow: 1,
})

const SubTitle = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({
  marginTop: 4,
})

const Info1 = muiStyled(Typography).attrs({
  color: 'textSecondary',
})({})

const Info2 = Info1

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

export const TopicItem: React.FC<ItemProps> = ({ onClick, title, subtitle, info1, info2 }) => (
  <ListItemS button divider onClick={onClick}>
    <TitleArea>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TitleArea>

    <InfoArea>
      <Info1>{info1}</Info1>
      <Info2>{info2}</Info2>
    </InfoArea>
  </ListItemS>
)

export type Place = 'inboard' | 'newtopic' | 'usercenter' | 'follow' | 'search' | 'hot'

interface Props {
  data: ITopic
  place: Place
}

export default ({ data, place }: Props) => {
  const [boardName, setBoardName] = useState('')
  useEffect(() => {
    if (place === 'inboard') {
      return
    }
    getBoardNameById(data.boardId).then(boardName => setBoardName(boardName))
  }, [place])

  const title = data.title
  let subtitle = data.userName || '[匿名]'
  let info1 = dayjs(data.lastPostTime).fromNow()
  let info2 = `回帖: ${data.replyCount}`

  switch (place) {
    case 'usercenter':
      subtitle = boardName
      break

    case 'hot':
      info1 = boardName
      break

    case 'newtopic':
      info1 = dayjs(data.time).fromNow()
    case 'follow':
    case 'search':
      // 搜索时使用发帖时间
      // https://github.com/ZJU-CC98/CC98-PWA/issues/35
      info1 = dayjs(data.time).fromNow()
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
