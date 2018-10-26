import basicInstance, { BasicContainer } from '@/model/basicInstance';
import { IUser } from '@cc98/api';
import { Subscribe } from '@cc98/state';
import React from 'react';
import EditContainer from './Edit';

export default class extends React.Component<{}, {}> {
  render() {

    return (
    <Subscribe to={[basicInstance]}>
      {(basic: BasicContainer) =>
        basic.state.myInfo ? <EditContainer info={basic.state.myInfo} /> : null
      }
    </Subscribe>);
  }
}
