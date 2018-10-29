import global, { GlobalContainer } from '@/model/global';
import { IUser } from '@cc98/api';
import { Subscribe } from '@cc98/state';
import React from 'react';
import EditContainer from './Edit';

export default class extends React.Component<{}, {}> {
  render() {

    return (
    <Subscribe to={[global]}>
      {(global: GlobalContainer) =>
        global.state.myInfo ? <EditContainer info={global.state.myInfo} /> : null
      }
    </Subscribe>);
  }
}
