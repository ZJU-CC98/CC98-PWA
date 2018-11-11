import React from 'react'

import { Subscribe } from '@cc98/state'

import global from '@/model/global'
import user, { UserInfoStore } from '@/model/user'

import User from './User'
interface Props {
  id: string | undefined
}

export default class extends React.Component<Props> {
  componentDidMount() {
    const { id } = this.props
    if (id) user.getInfo(parseInt(id, 10))
  }

  render() {
    if (this.props.id) {
      const id = parseInt(this.props.id, 10)

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
        {() => (
          global.state.myInfo ? <User info={global.state.myInfo} isUserCenter={true} /> : null
        )}
      </Subscribe>
    )
  }
}
