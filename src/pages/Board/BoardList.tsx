import { GET } from '@/utils/fetch'
import { IBaseBoard, IBoard } from '@cc98/api'
import React from 'react'
import SearchInput, { createFilter } from 'react-search-input'
import BaseBoard from './BaseBoardItem'
import BoardItem from './BoardItem'
const KEYS_TO_FILTERS = ['name']
interface Props {
  boards: IBoard[]
}
interface State {
  boardList: IBaseBoard[]
  isLoading: boolean
  searchTerm: string
}
export default class extends React.Component<Props, State> {
  state: State = {
    boardList: [],
    isLoading: true,
    searchTerm: '',
  }
  searchUpdated = (term: string) =>
    this.setState({ searchTerm: term })

  async componentDidMount() {
    this.getBoardList()
  }

  getBoardList = async () => {
    this.setState({ isLoading: true })
    const baseBoardsData = await GET<IBaseBoard[]>('board/all')
    baseBoardsData.map(baseBoards =>
      this.setState({
        isLoading: false,
        boardList: baseBoards,
      })
    )
  }

  render() {
    const { boardList, isLoading, searchTerm } = this.state
    const { boards } = this.props
    const filteredBoards = boards.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        {searchTerm ? filteredBoards.map(board =>
          (
            <BoardItem data={board} />
          )
        ) : null}

        {searchTerm ? null : boardList.map((data: IBaseBoard) => (
          <BaseBoard key={data.id} data={data} />
        ))}
      </div>
    )
  }
}
