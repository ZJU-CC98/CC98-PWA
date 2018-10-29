import InfinitiList from '@/components/InfinitiList'
import getBoardName from '@/services/getBoardName'
import { GET } from '@/utils/fetch';
import { ITopic } from '@cc98/api'
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {css} from 'emotion'
import React from 'react'
import TopicItem from './TopicItem'
interface State {
  isLoading: boolean
  isEnd: boolean
  b_topics: ITopic[]
  b_from: number
  u_topics: ITopic[]
  u_from: number
  current: string
}
const TabsStyle = css`
  width:100%;
`
export default class extends React.Component<{}, State> {
  state: State = {
    isLoading: false,
    isEnd: false,
    b_topics: [],
    b_from: 0,
    u_topics: [],
    u_from: 0,
    current: 'board',
  }

  componentDidMount() {
    if (this.state.current === 'board') {
      this.getFollowBoardTopics();
    } else {
      this.getFolloweeTopics();
    }
  }

  changeFocus = () => {
    if (this.state.current === 'board') {
      this.getFolloweeTopics();
    } else {
      this.getFollowBoardTopics();
    }
    this.setState({
      current: this.state.current === 'board' ? 'user' : 'board',
    })
  }

  getFollowBoardTopics = async () => {
    const { b_from } = this.state

    this.setState({
      isLoading: true,
    })

    const topicsTry = await GET<ITopic[]>(`/me/custom-board/topic?from=${b_from}&size=20`);
    topicsTry.map(async topicList => {
      // tslint:disable-next-line:prefer-array-literal
      const results: ITopic[] = await Promise.all(topicList.map(
        async topic => {
          topic.boardName = await getBoardName(topic.boardId);

          return topic;
        }
      ));
      this.setState({
        b_topics: this.state.b_topics.concat(results),
        b_from: b_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      })
    }
    );
  }

  getFolloweeTopics = async () => {
    const { u_from } = this.state
    this.setState({
      isLoading: true,
    })

    const topicsTry = await GET<ITopic[]>(`/me/followee/topic?from=${u_from}&size=20`);
    topicsTry.map(async topicList => {
      // tslint:disable-next-line:prefer-array-literal
      const results: ITopic[] = await Promise.all(topicList.map(
        async topic => {
          topic.boardName = await getBoardName(topic.boardId);

          return topic;
        }
      ));
      this.setState({
        u_topics: this.state.u_topics.concat(results),
        u_from: u_from + topicList.length,
        isLoading: false,
        isEnd: topicList.length !== 20,
      })
    }
    );
  }

  render() {
    const { isLoading, isEnd, b_topics, u_topics, current } = this.state;
    const topics = current === 'board' ? b_topics : u_topics;

    return (
      <div>
        <Tabs fullWidth value={current} onChange={this.changeFocus}>
          <Tab value="board" label="关注版面" />
          <Tab value="user" label="关注用户" />
        </Tabs>
        <InfinitiList
          isLoading={isLoading}
          isEnd={isEnd}
          callback={current === 'board' ? this.getFollowBoardTopics : this.getFolloweeTopics}
        >
          {topics.map(topic => (
            <TopicItem key={topic.id} data={topic} />
          ))}
        </InfinitiList>
      </div>
    )
  }
}
