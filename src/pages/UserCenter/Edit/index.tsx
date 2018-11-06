import React from 'react';

import { Subscribe } from '@cc98/state';

import global, { GlobalContainer } from '@/model/global';

import EditContainer from './Edit';

export default class extends React.Component<{}, {}> {
  render() {

    return (
    <Subscribe to={[global]}>
      {(basic: GlobalContainer) =>
        basic.state.myInfo ? <EditContainer info={basic.state.myInfo} /> : null
      }
    </Subscribe>);
  }
}
