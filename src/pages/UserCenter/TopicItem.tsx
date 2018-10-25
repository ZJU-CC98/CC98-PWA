import { ITopic } from '@cc98/api'
import ListItem from '@material-ui/core/ListItem'
import { navigate } from '@reach/router'
import { css } from 'emotion'

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
`
const TopicItemTimeStyle = css`
  font-size: 0.8rem;
  margin-left: 2rem;
  color: rgba(0, 0, 0, 0.54);
`
const TopicItemBoardStyle = css`
  font-size: 0.8rem;
  color: #35a7ff;
  cursor: pointer;
`
const TopicItemTitleStyle = css`
  && {
    width: 100%;
    cursor: pointer;
  }
`

export default (props: TopicProps) => (
  <ListItem>
    <div className={TopicItemRootStyle}>
      <div className={TopicItemMetaStyle}>
        <div
          onClick={() => navigate(`/board/${props.data.boardId}`)}
          className={TopicItemBoardStyle}
        >
          {props.data.boardName}
        </div>
        <div className={TopicItemTimeStyle}>{new Date(props.data.time).toLocaleString()}</div>
      </div>
      <div className={TopicItemTitleStyle} onClick={() => navigate(`/topic/${props.data.id}`)}>
        {props.data.title}
      </div>
    </div>
  </ListItem>
)
