import { GET } from '@/utils/fetch'
import { IBoard, ITopic } from '@cc98/api'
import List from '@material-ui/core/List'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import Select from 'rc-select'
import 'rc-select/assets/index.css'
import React from 'react'
import BoardHead from './BoardHead'
import TopicItem from './TopicItem'

interface Props {
  id: string
  page: string | null | undefined
}
interface State {
  board: IBoard | null
  topics: ITopic[]
  size: number
}
const BoardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`
const ListStyle = css`
  && {
    width: 100%;
  }
`
const PaginationStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
`
export default class extends React.Component<Props, State> {
  state: State = {
    board: null,
    topics: [],
    size: 0,
  }
  async componentDidMount() {
    this.getBoard()
    this.getTopics()
  }
  getBoard = async () => {
    const { id } = this.props
    const boardData = await GET<IBoard>(`board/${id}`)
    boardData.map(board => {
      const size = (board.topicCount - (board.topicCount % 20)) / 20 + 1
      this.setState({ board, size })
    })
  }
  getTopics = async () => {
    const { id, page } = this.props
    let _page: number = 1
    if (!page) _page = 1
    else _page = parseInt(page, 10)
    const from = (_page - 1) * 20
    const size = 20
    const topTopicsData = await GET<ITopic[]>(`/topic/toptopics?boardid=${id}`)
    topTopicsData.map(async topTopics => {
      const topicsData = await GET<ITopic[]>(`/Board/${id}/topic?from=${from}&size=${size}`)
      topicsData.map(topics => {
        const boardTopics = topTopics.concat(topics)
        this.setState({ topics: boardTopics })
      })
    })
  }
  onChange = (current: number) => {
    navigate(`/board/${this.props.id}/${current}`)
    this.getTopics()
  }
  render() {
    const { topics, board, size } = this.state
    return (
      <div className={BoardStyle}>
        <BoardHead data={board} />
        <div className={PaginationStyle}>
          <Pagination simple defaultCurrent={1} onChange={this.onChange} total={size} />
        </div>

        <List className={ListStyle} component="nav">
          {topics.map(topic => (
            <TopicItem data={topic} />
          ))}
        </List>
      </div>
    )
  }
}
