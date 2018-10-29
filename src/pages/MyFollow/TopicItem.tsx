import { ITopic } from '@cc98/api'
import ListItem from '@material-ui/core/ListItem'
import { navigate } from '@reach/router'
import dayjs from 'dayjs'

import { css } from 'emotion'
import React from 'react'


// dayjs.extend(relativeTime)
interface TopicProps {
  data: ITopic
}
const TopicItemRootStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
const TopicItemMetaStyle = css`
  display: flex;
  width: 100%;
  justify-content:space-between;
`
const TopicItemTimeStyle = css`
  font-size: 0.8rem;
  margin-left: 2rem;
  color: rgba(0, 0, 0, 0.54);
  flex-grow:2;
`
const TopicItemBoardStyle = css`
  font-size: 0.8rem;
  color: #35a7ff;
  cursor: pointer;
  flex-grow:1;
`
const TopicItemTitleStyle = css`
  && {
    width: 100%;
    cursor: pointer;

  }
`
const TopicItemUserNameStyle = css`
  font-size:0.8rem;
  flex-grow:1;
`
export default (props: TopicProps) =>

  (
    <ListItem key={props.data.id}>
      <div className={TopicItemRootStyle}>
        <div className={TopicItemMetaStyle}>
          <div
            onClick={() => navigate(`/board/${props.data.boardId}`)}
            className={TopicItemBoardStyle}
          >
            {props.data.boardName}
          </div>
          <div className={TopicItemUserNameStyle}>{props.data.userName}</div>
          <div className={TopicItemTimeStyle}>
            {dayjs(props.data.lastPostTime).format()}
          </div>
        </div>
        <div className={TopicItemTitleStyle} onClick={() => navigate(`/topic/${props.data.id}`)}>
          {props.data.title}
        </div>
      </div>
    </ListItem>
  )
