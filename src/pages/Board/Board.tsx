import React from 'react';
import { GET } from '@/utils/fetch';
import { IBoard, ITopic } from '@cc98/api';
import List from '@material-ui/core/List';
import TopicItem from './TopicItem';
import { css } from 'emotion';
import BoardHead from './BoardHead';
//import Pagination from 'rc-pagination';
//import Select from 'rc-select';
//import 'rc-pagination/assets/index.css';
//import 'rc-select/assets/index.css';
type Props = {
  id: string,
  page: string | null | undefined
}
type State = {
  board: IBoard | null,
  topics: ITopic[]
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
export default class extends React.Component<Props, State>{
  state: State = {
    board: null,
    topics: []
  }
  async componentDidMount() {
    this.getBoard();
    this.getTopics();
  }
  getBoard = async () => {
    const { id } = this.props;
    const boardData = await GET<IBoard>(`board/${id}`);
    boardData.map(
      board => this.setState({ board })
    )
  }
  getTopics = async () => {
    const { id, page } = this.props;
    let _page: number = 1;
    if (!page) _page = 1;
    else _page = parseInt(page);
    const from = (_page - 1) * 20;
    const size = 20;
    const topTopicsData = await GET<ITopic[]>(`/topic/toptopics?boardid=${id}`);
    topTopicsData.map(
      async (topTopics) => {
        const topicsData = await GET<ITopic[]>(`/Board/${id}/topic?from=${from}&size=${size}`);
        topicsData.map(
          topics => {
            const boardTopics = topTopics.concat(topics);
            this.setState({ topics: boardTopics });
          }
        )
      }
    )
  }
  onChange = (current: number) => {
    console.log('onChange:current=', current);
  }
  render() {
    const { topics, board } = this.state;
    return (
      <div className={BoardStyle}>
        <BoardHead data={board} />

        <List className={ListStyle} component="nav">
          {topics.map((topic) => <TopicItem data={topic} />)}
        </List>
      </div>


    );
  }
}
{/* <Pagination
selectComponentClass={Select}
  showSizeChanger
  showQuickJumper={{ goButton: <button>确定</button> }}
  defaultPageSize={20}
  defaultCurrent={1}
  onChange={this.onChange}
  total={450}
/> */}
