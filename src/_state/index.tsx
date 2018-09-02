import React from 'react'
import produce from 'immer'

// utils
function identity(identity: any) {
  return identity
}

function shallowEqual(objA: any, objB: any) {
  const keysA = Object.keys(objA)

  for (let idx = 0; idx < keysA.length; idx++) {
    let key = keysA[idx];

    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}


export default function init<T>(initStore: T) {

  let _store = initStore

  function createSubscribe() {
    const listenerList: any = []

    return {
      listen: (listener: Function) => {
        listenerList.push(listener)
      },

      unListen: (listener: Function) => {
        listenerList.splice(listenerList.indexOf(listener), 1)
      },

      update: (updator: Function) => {
        const nextStore = produce<T>(_store, draft => {
          updator(draft)
        })

        if (_store !== nextStore) {

          for (let i = 0; i < listenerList.length; i++) {
            listenerList[i](nextStore, _store)
          }

          _store = nextStore
        }
      },
    }
  }

  const { listen, unListen, update } = createSubscribe()


  class Ctx extends React.PureComponent<{
    selector?: (store: T) => any
  }> {

    componentDidMount() {
      listen(this.reRender)
    }

    componentWillUnmount() {
      unListen(this.reRender)
    }

    reRender = (nextStore: T, prevStore: T) => {
      const selector = this.props.selector

      if (selector && shallowEqual(nextStore, prevStore)) {
        // force update
        this.forceUpdate()
      }

    }

    render() {
      const selector = this.props.selector || identity

      return (this.props.children as (props: any) => React.ReactNode)(selector(_store))
    }
  }


  return {

    Ctx,

    Put: update,

    Store: () => _store

  }
}

