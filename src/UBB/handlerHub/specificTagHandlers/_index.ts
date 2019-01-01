import { IHandlerHub } from '@cc98/ubb-core'

import React from 'react'

import align from './align'
import audio from './audio'
import b from './b'
import bili from './bili'
import center from './center'
import color from './color'
import code from './code'
import cursor from './cursor'
import del from './del'
import english from './english'
import font from './font'
import i from './i'
import img from './img'
import left from './left'
import noubb from './noubb'
import quote from './quote'
import right from './right'
import sandbox from './sandbox'
import size from './size'
import table from './table'
import td from './td'
import th from './th'
import tr from './tr'
import u from './u'
import upload from './upload'
import url from './url'

/*
 * TODO: glow?, md, pm, topic, user, video
 */
const tagHandlers: IHandlerHub<React.ReactNode>['specificTagHandlers'] = {
  // register handler here
  // e.g. "b": handler_for_tag_b
  align,
  audio,
  b,
  bili,
  center,
  color,
  code,
  cursor,
  del,
  english,
  font,
  i,
  img,
  left,
  mp3: audio,
  noubb,
  quote,
  quotex: quote,
  right,
  sandbox,
  size,
  table,
  td,
  th,
  tr,
  u,
  upload,
  url,
}

export default tagHandlers
