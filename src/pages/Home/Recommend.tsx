import React, { useState, useEffect } from 'react'
import { navigate } from '@reach/router'
import { css } from 'emotion'

import { List, ListItem, ListItemText, ListItemIcon, Divider, Avatar } from '@material-ui/core'
import Event from '@material-ui/icons/Event'
import Left from '@material-ui/icons/ChevronLeft'
import Right from '@material-ui/icons/ChevronRight'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ItemsCarousel from 'react-items-carousel'

import { getHomeInfo } from '@/services/global'

const RecommendList = css`
  && {
    padding-left: 15px;
  }
`

export default () => {
  // tslint:disable-next-line:no-any
  const [data, setData] = useState<any>(null)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    ; (async () => {
      const res = await getHomeInfo()
      res.fail().succeed(newData => setData(newData))
    })()
  }, [])

  useEffect(() => {
    const timerId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % 5)
    }, 3000)

    return () => clearInterval(timerId)
  }, [])

  const changeActiveItem = (i: number) => setIndex(i)

  return (
    data && (
      <List className={RecommendList}>
        <ListItem>
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="推荐阅读" />
        </ListItem>
        <Divider />
        <ItemsCarousel
          // Carousel configurations
          numberOfCards={1}
          gutter={12}
          showSlither={true}
          firstAndLastGutter={true}
          freeScrolling={false}
          // Active item configurations
          requestToChangeActive={changeActiveItem}
          activeItemIndex={index}
          activePosition={'center'}
          chevronWidth={24}
          rightChevron={<Right />}
          leftChevron={<Left />}
          outsideChevron={false}
        >
          {// tslint:disable-next-line:no-any
          data.recommendationReading.map((info: any) => (
            <ListItem onClick={() => navigate(info.url)}>
              <ListItemIcon>
                <Avatar src={info.imageUrl} />
              </ListItemIcon>
              <ListItemText primary={info.title} />
            </ListItem>
          ))}
        </ItemsCarousel>
      </List>
    )
  )
}
