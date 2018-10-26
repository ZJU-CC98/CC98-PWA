import basicInstance, { BasicContainer } from '@/model/basicInstance'
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

<<<<<<< HEAD
  async componentDidMount() {
    const { id, name } = this.props
    if (id) {
      const userInfoData = await GET<IUser>(`/user/${id}`)
      userInfoData.fail().succeed(userInfo => this.setState({ info: userInfo }))
    }
    if (name) {
      const userInfoData = await GET<IUser>(`/user/name/${name}`)
      userInfoData.fail().succeed(userInfo => this.setState({ info: userInfo }))
    }
  }

  render() {
    const { id, name } = this.props
    if (id || name) {
      return this.state.info ? <User info={this.state.info} isUserCenter={false} /> : null
=======
export default class extends React.Component<Props> {
  componentDidMount() {
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
>>>>>>> 4a227bc66edcc45c672d3528bcc042cbe1899e90
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
