import InfiniteList from '@/components/InfiniteList'
import { GET } from '@/utils/fetch'
import { ITopic, IUser } from '@cc98/api'
import Button from '@material-ui/core/Button'
import React from 'react'
import { css } from 'react-emotion'
import SearchInput from 'react-search-input'
import TopicItem from '../Board/TopicItem'
interface State {
  searchTerm: string
  topics: ITopic[]
  users: IUser[]
  isLoading: boolean
  isEnd: boolean
  t_from: number
  u_from: number
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
  }

  searchUpdated = (term: string) => {
    this.setState({ searchTerm: term })
  }
  getTopics = async () => {
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
        })
      )
  }

  render() {
    const { topics, users, isLoading, searchTerm, isEnd } = this.state

    return (
      <div className={Root}>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <Button color="primary" variant="outlined" onClick={() => { this.getTopics() }}>搜索</Button>
        <InfiniteList
          initLoading={false}
          isLoading={isLoading}
          isEnd={isEnd}
          callback={this.getTopics}
        >
          {topics.map(info => (
            <TopicItem key={info.id} data={info} />
          ))}
        </InfiniteList>
      </div>

    )
  }
}
