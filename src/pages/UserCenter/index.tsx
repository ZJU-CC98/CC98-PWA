import basicInstance, { BasicContainer } from '@/model/basicInstance'
import { GET } from '@/utils/fetch'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import { IUser } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import React from 'react'
import User from './User'
interface Props {
  id: string | undefined
}
interface State {
  info: IUser | null
}
export default class extends React.Component<Props, State> {
  state: State = {
    info: null,
  }
  async componentDidMount() {
    const { id } = this.props
    if (id) {
      const userInfoData = await GET<IUser>(`/user/${id}`)
      userInfoData.fail().succeed(userInfo => this.setState({ info: userInfo }))
    }
  }
  render() {
    const { id } = this.props
    if (id) return this.state.info ? <User info={this.state.info} /> : null
    return (
      <Subscribe to={[basicInstance]}>
        {(basic: BasicContainer) => {
          return basic.state.myInfo ? <User info={basic.state.myInfo} /> : null
        }}
      </Subscribe>
    )
  }
}
