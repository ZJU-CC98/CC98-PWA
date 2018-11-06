import React from 'react'

import Component from './BoardData'

interface Props {
  id: string
}
export default (props: Props) => (
  <Component id={props.id} />
)
