/**
 * @author Dearkano
 * @date 2018-11-10
 */
import React, { useState } from 'react'

import { Subscribe } from '@cc98/state'
import global from '@/model/global'

import { ListItem, ListItemText, Switch } from '@material-ui/core'
import WhiteList from '../../config/proxy'

export default () => {
  const [state, setState] = useState(Boolean(localStorage.getItem('proxy')))
  function changeProxy() {
    if (localStorage.getItem('proxy')) {
      localStorage.removeItem('proxy')
      setState(false)
    } else {
      localStorage.setItem('proxy', '233333')
      setState(true)
    }
  }

  return (
    <Subscribe to={[global]}>
      {() => {
        const name = global.state.myInfo ? global.state.myInfo.name : ''
        if (WhiteList.indexOf(name) !== -1) {
          return (
            <ListItem button onClick={() => changeProxy()}>
              <ListItemText primary="开启代理" />
              <Switch checked={state} />
            </ListItem>
          )
        }

        return null
      }}
    </Subscribe>
  )
}
