import { GET } from '@/utils/fetch'
import { IBaseBoard } from '@cc98/api'
import React from 'react'
import BaseBoard from './BaseBoardItem'

interface State {
  boardList: IBaseBoard[]
  isLoading: boolean
}
export default class extends React.Component<{}, State> {
  state: State = {
    boardList: [],
    isLoading: true,
  }

  async componentDidMount() {
    this.getBoardList()
  }

  getBoardList = async () => {
    this.setState({ isLoading: true })
    const baseBoardsData = await GET<IBaseBoard[]>('/board/all')
    baseBoardsData.map(baseBoards =>
      this.setState({
        isLoading: false,
        boardList: baseBoards,
      })
    )
  }

  render() {
    const { boardList, isLoading } = this.state

    return (
      <div>
        {boardList.map((data: IBaseBoard) => (
          <BaseBoard key={data.id} data={data} />
        ))}
      </div>
    )
  }
}
