import { GET } from '@/utils/fetch'
import { IBoard, ITopic } from '@cc98/api'
import List from '@material-ui/core/List'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import 'rc-pagination/assets/index.css'
import 'rc-select/assets/index.css'
import React from 'react'
import BoardHead from './BoardHead'
import TopicItem from './TopicItem'
import InfinitiList from '@/components/InfinitiList';

interface Props {
  id: string
}
interface State {
  board: IBoard | null
  topics: ITopic[]
  isLoading: boolean
  isEnd: boolean
  from :number
}
const BoardStyle = css`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    isLoading: false,
    isEnd: false,
    from:0
  }

  async componentDidMount() {
    this.getBoard()
    this.getTopTopics();
    this.getTopics()
  }

  getTopTopics = async () => {
    const { id } = this.props
    const topTopicsData = await GET<ITopic[]>(`/topic/toptopics?boardid=${id}`)
    topTopicsData.map(async topTopics => {
      this.setState({
        topics: this.state.topics.concat(topTopics)
      })
    })
  }

  getBoard = async () => {
    const { id } = this.props
    const boardData = await GET<IBoard>(`board/${id}`)
    boardData.map(board => {
      const size = (board.topicCount - (board.topicCount % 20)) / 20 + 1
      this.setState({ board })
    })
  }

  getTopics = async () => {
    this.setState({
      isLoading: true,
    })
    const { id } = this.props;
    const { from } = this.state;
    const topicsData = await GET<ITopic[]>(`/Board/${id}/topic?from=${from}&size=20`)
    topicsData.map(topics => {
      this.setState({
        topics: this.state.topics.concat(topics),
        from: from + topics.length,
        isLoading: false,
        isEnd: topics.length !== 20,
      })
    })

  }

  render() {
    const { topics, board, isLoading, isEnd } = this.state

    return (
      <div className={BoardStyle}>
        <BoardHead data={board} />
        <InfinitiList isLoading={isLoading} isEnd={isEnd} callback={this.getTopics}>
          {topics.map(topic => (
            <TopicItem data={topic} />
          ))}
        </InfinitiList>
      </div>
    )
  }
}
