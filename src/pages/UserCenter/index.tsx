import basicInstance, { BasicContainer } from '@/model/basicInstance'
import user, { UserInfoStore } from '@/model/userInfo'
import { GET } from '@/utils/fetch'
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
    if (id) user.getInfo(id)
  }

  render() {
    const { id } = this.props
    if (id) {
      return (
        <Subscribe to={[user]}>
          {({ state: userMap }: UserInfoStore) => (
            userMap[id] ? <User info={userMap[id]} isUserCenter={false} /> : null
          )}
        </Subscribe>
      )
    }

    return (
      <Subscribe to={[basicInstance]}>
        {(basic: BasicContainer) => (
          basic.state.myInfo ? <User info={basic.state.myInfo} isUserCenter={true} /> : null
        )}
      </Subscribe>
    )
  }
}
