import React, { useState } from 'react'

import { css } from 'emotion'
import { navigate } from '@reach/router'

import useFetcher from '@/hooks/useFetcher'

import { List } from '@material-ui/core'

import TopicList from '@/components/TopicList'
import TopicItem from '@/components/TopicItem'

import BoardHead from './BoardHead'
import Tags from './Tags'

import { getBoard, getBoardTags } from '@/services/board'
import { getTopicsInBoard, getTopTopics } from '@/services/topic'

const root = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`

const wrapper = css`
  && {
    width: 100%;
  }
`

interface Props {
  id: string
}

export default ({ id }: Props) => {
  const [board] = useFetcher(() => getBoard(id), {
    fail: err => {
      if (err.status === 403) {
        navigate('/error/403')
      } else if (err.status === 401) {
        navigate('/error/401')
      }
    },
    success: data => {
      // 外网不可见的版面
      if (data.internalState === 1) {
        navigate('/error/401')
      }
    },
  })

  const [topTopics] = useFetcher(() => getTopTopics(id))

  const [boardTags] = useFetcher(() => getBoardTags(id))
  const [tagIDs, setTagIDs] = useState<[number, number]>([-1, -1])

  const onTagChange = (tagID: number, index: number) => {
    if (index === 0) {
      setTagIDs([tagID, tagIDs[1]])
    } else {
      setTagIDs([tagIDs[0], tagID])
    }
  }

  return (
    <div className={root}>
      {board && <BoardHead data={board} />}

      <Tags boardTags={boardTags} onChange={onTagChange} />

      {topTopics && (
        <List className={wrapper}>
          {topTopics.map(info => (
            <TopicItem key={info.id} data={info} />
          ))}
        </List>
      )}

      <TopicList
        key={`${tagIDs[0]}-${tagIDs[1]}`}
        service={(from: number) => getTopicsInBoard(id, from, 20, tagIDs[0], tagIDs[1])}
        place="inboard"
      />
    </div>
  )
}
