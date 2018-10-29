import global, { GlobalContainer } from '@/model/global'
import user, { UserInfoStore } from '@/model/user'
import { GET } from '@/utils/fetch'
import { IUser } from '@cc98/api'
import { Subscribe } from '@cc98/state'
import React from 'react'
import User from './User'
interface Props {
  id: string | undefined
  name: string | undefined
}

export default class extends React.Component<Props> {
  componentDidMount() {
    const { id, name } = this.props
    if (id) user.getInfo(id)
    if (name) user.getInfo(name);
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
      <Subscribe to={[global]}>
        {(global: GlobalContainer) => (
          global.state.myInfo ? <User info={global.state.myInfo} isUserCenter={true} /> : null
        )}
      </Subscribe>
    )
  }
}
