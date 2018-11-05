import React from 'react'
import { css } from 'react-emotion'

import { Button, List, Paper } from '@material-ui/core'

import SearchInput from 'react-search-input'

import InfiniteList from '@/components/InfiniteList'
import TopicItem from '@/components/TopicItem'

import { GET } from '@/utils/fetch'
import { ITopic } from '@cc98/api'

interface State {
  searchTerm: string
  topics: ITopic[]
  isLoading: boolean
  isEnd: boolean
  from: number
  view: boolean
}

const root = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export default class extends React.Component<{}, State> {
  state: State = {
    searchTerm: '',
    isLoading: false,
    isEnd: false,
    from: 0,
    topics: [],
    view: false,
  }

  searchUpdated = (term: string) => {
    this.setState({ searchTerm: term })
  }
  initTopics = async () => {
    this.setState(
      {
        from: 0,
        topics: [],
      },
      () => {
        this.getTopics()
      }
    )
  }

  getTopics = async () => {
    this.setState({
      isLoading: true,
    })
    const { topics, searchTerm, from } = this.state
    const url = `topic/search?keyword=${searchTerm}&from=${from}&size=20`
    const topicsTry = await GET<ITopic[]>(url)
    topicsTry.fail().succeed((topicsData: ITopic[]) =>
      this.setState({
        topics: topics.concat(topicsData),
        from: from + topicsData.length,
        isLoading: false,
        isEnd: topicsData.length !== 20,
        view: true,
      })
    )
  }

  render() {
    const { topics, isLoading, isEnd, view } = this.state

    return (
      <div className={root}>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            this.initTopics()
          }}
        >
          搜索
        </Button>
        {view && (
          <Paper>
            <InfiniteList isLoading={isLoading} isEnd={isEnd} callback={this.getTopics}>
              <List>
                {topics.map(info => (
                  <TopicItem key={info.id} data={info} place={'search'} />
                ))}
              </List>
            </InfiniteList>
          </Paper>
        )}
      </div>
    )
  }
}
