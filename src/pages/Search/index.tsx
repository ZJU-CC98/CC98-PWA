import InfiniteList from '@/components/InfiniteList'
import { GET } from '@/utils/fetch'
import { ITopic, IUser } from '@cc98/api'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import React from 'react'
import { css } from 'react-emotion'
import SearchInput from 'react-search-input'
import TopicItem from '../TopicItem'
interface State {
  searchTerm: string
  topics: ITopic[]
  users: IUser[]
  isLoading: boolean
  isEnd: boolean
  t_from: number
  u_from: number
  initLoading: boolean
}
const Root = css`
  display:flex;
  flex-direction:column;
  width:100%;
`
export default class extends React.Component<{}, State> {
  state: State = {
    searchTerm: '',
    isLoading: false,
    isEnd: false,
    t_from: 0,
    u_from: 0,
    topics: [],
    users: [],
    initLoading: false,
  }

  searchUpdated = (term: string) => {
    this.setState({ searchTerm: term })
  }
  initTopics = async () => {
    this.setState({
      t_from: 0,
      u_from: 0,
      topics: [],
      users: [],
      initLoading: false,
    },            () => { this.getTopics() })

  }

  getTopics = async () => {
    console.log('callback')
    this.setState({
      isLoading: true,
    })
    const { topics, searchTerm, t_from, isLoading, isEnd } = this.state
    const url = `topic/search?keyword=${searchTerm}&from=${t_from}&size=20`
    const topicsTry = await GET<ITopic[]>(url)
    topicsTry
      .fail()
      .succeed(
        (topicsData: ITopic[]) => this.setState({
          topics: topics.concat(topicsData),
          t_from: t_from + topicsData.length,
          isLoading: false,
          isEnd: topicsData.length !== 20,
          initLoading: true,
        })
      )
  }

  render() {
    const { topics, users, isLoading, searchTerm, isEnd, initLoading } = this.state

    return (
      <div className={Root}>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <Button color="primary" variant="outlined" onClick={() => { this.initTopics() }}>搜索</Button>
        <InfiniteList
          initLoading={initLoading}
          isLoading={isLoading}
          isEnd={isEnd}
          callback={this.getTopics}
        >
          <List>
            {topics.map(info => (
              <TopicItem key={info.id} data={info} place={'search'} />
            ))}
          </List>
        </InfiniteList>
      </div>

    )
  }
}
