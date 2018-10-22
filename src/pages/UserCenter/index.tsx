<<<<<<< HEAD
import React from 'react';
import User from './User';
import {
  getLocalStorage,
  setLocalStorage
} from '@/utils/storage';
import basicInstance, { BasicContainer } from '@/model/basicInstance';
import { Subscribe } from '@cc98/state';
import { IUser } from '@cc98/api';
import { GET } from '@/utils/fetch';
type Props = {
  id: string | undefined,
  name: string | undefined
=======
import React from 'react'
import User from './User'
import { getLocalStorage, setLocalStorage } from '@/utils/storage'
import basicInstance, { BasicContainer } from '@/model/basicInstance'
import { Subscribe } from '@cc98/state'
import { IUser } from '@cc98/api'
import { GET } from '@/utils/fetch'
type Props = {
  id: string | undefined
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
}
type State = {
  info: IUser | null
}
<<<<<<< HEAD
export default class extends React.Component<Props, State>{
  state: State = {
    info: null
  }
  async componentDidMount() {
    const { id, name } = this.props;
    if (id) {
      const userInfoData = await GET<IUser>(`/user/${id}`);
      userInfoData
        .fail()
        .succeed(
          userInfo => this.setState({ info: userInfo })
        )
    } else if (name) {
      const userInfoData = await GET<IUser>(`/user/name/${name}`);
      userInfoData
        .fail()
        .succeed(
          userInfo => this.setState({ info: userInfo })
        )
    }
  }
  render() {
    const { id, name } = this.props;
    const isUserCneter = !(id||name);
    if (!isUserCneter)
      return this.state.info ? <User info={this.state.info} isUserCenter={false} /> : null
    else
      return <Subscribe to={[basicInstance]}>
        {
          (basic: BasicContainer) => {
            return basic.state.myInfo ? <User info={basic.state.myInfo}  isUserCenter={true}/> : null
          }
        }
      </Subscribe>;
=======
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
    else
      return (
        <Subscribe to={[basicInstance]}>
          {(basic: BasicContainer) => {
            return basic.state.myInfo ? <User info={basic.state.myInfo} /> : null
          }}
        </Subscribe>
      )
>>>>>>> 6793fe3b1b7af77bdd39bc11a5a76a6249a1d858
  }
}
