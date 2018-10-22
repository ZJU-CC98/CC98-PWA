<<<<<<< HEAD
import React from 'react';
import { GET } from '@/utils/fetch';
import { IBoard, ITopic } from '@cc98/api';
import List from '@material-ui/core/List';
import TopicItem from './TopicItem';
import { css } from 'emotion';
import BoardHead from './BoardHead';
import Pagination from 'rc-pagination';
import Select from 'rc-select';
import 'rc-pagination/assets/index.css';
import 'rc-select/assets/index.css';
import { navigate } from '@reach/router';

=======
import React from 'react'
import { GET } from '@/utils/fetch'
import { IBoard, ITopic } from '@cc98/api'
import List from '@material-ui/core/List'
import TopicItem from './TopicItem'
import { css } from 'emotion'
import BoardHead from './BoardHead'
//import Pagination from 'rc-pagination';
//import Select from 'rc-select';
//import 'rc-pagination/assets/index.css';
//import 'rc-select/assets/index.css';
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
type Props = {
  id: string
  page: string | null | undefined
}
type State = {
<<<<<<< HEAD
  board: IBoard | null,
  topics: ITopic[],
  size:number
}
const BoardStyle = css`&&{
  display:flex;
  flex-direction:column;
  align-items:center;
  width:100%;
}`
const ListStyle = css`&&{
  width:100%;
}`
const PaginationStyle = css`
  width:100%;
  display:flex;
  justify-content:center;
`
export default class extends React.Component<Props, State>{
  state: State = {
    board: null,
    topics: [],
    size:0
=======
  board: IBoard | null
  topics: ITopic[]
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
export default class extends React.Component<Props, State> {
  state: State = {
    board: null,
    topics: [],
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
  }
  async componentDidMount() {
    this.getBoard()
    this.getTopics()
  }
  getBoard = async () => {
<<<<<<< HEAD
    const { id } = this.props;
    const boardData = await GET<IBoard>(`board/${id}`);
    boardData.map(
      board => {
        const size = (board.topicCount - board.topicCount % 20) / 20 + 1
        this.setState({ board ,size});
      }
    )
=======
    const { id } = this.props
    const boardData = await GET<IBoard>(`board/${id}`)
    boardData.map(board => this.setState({ board }))
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
  }
  getTopics = async () => {
    const { id, page } = this.props
    let _page: number = 1
    if (!page) _page = 1
    else _page = parseInt(page)
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
<<<<<<< HEAD
    navigate(`/board/${this.props.id}/${current}`);
    this.getTopics();
  }
  render() {
    const { topics, board,size } = this.state;
=======
    console.log('onChange:current=', current)
  }
  render() {
    const { topics, board } = this.state
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
    return (
      <div className={BoardStyle}>
        <BoardHead data={board} />
        <div className={PaginationStyle}>
          <Pagination
            simple
            defaultCurrent={1}
            onChange={this.onChange}
            total={size}
          />
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
<<<<<<< HEAD
=======
{
  /* <Pagination
selectComponentClass={Select}
  showSizeChanger
  showQuickJumper={{ goButton: <button>确定</button> }}
  defaultPageSize={20}
  defaultCurrent={1}
  onChange={this.onChange}
  total={450}
/> */
}
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
