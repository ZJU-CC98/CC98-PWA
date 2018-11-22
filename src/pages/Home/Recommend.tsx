import React, { useState, useEffect } from 'react'
import { navigate } from '@/utils/history'
import { css } from 'emotion'

import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Button,
  MobileStepper,
} from '@material-ui/core'
import { withStyles, Theme } from '@material-ui/core/styles'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'
import Event from '@material-ui/icons/Event'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'

import { getHomeInfo } from '@/services/global'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
const RecommendList = css`
  && {
    padding-left: 15px;
  }
`
const styles = (theme: Theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  avatarRoot: {
    backgroundColor: '#79b8fa',
  },
})

interface Props {
  classes: ClassNameMap
  theme: Theme
}
export default withStyles(styles, { withTheme: true })((props: Props) => {
  const { classes, theme } = props
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

  const handleStepChange = (i: number) => setIndex(i)
  const handleNext = () => setIndex(prevState => prevState + 1)
  const handleBack = () => setIndex(prevState => prevState - 1)

  return (
    data && (
      <List className={RecommendList}>
        <ListItem key="head">
          <ListItemIcon>
            <Event />
          </ListItemIcon>
          <ListItemText primary="推荐阅读" />
        </ListItem>
        <Divider />

        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={index}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {// tslint:disable-next-line:no-any
          data.recommendationReading.map((info: any) => (
            <ListItem key={info.id} onClick={() => navigate(info.url)}>
              <ListItemIcon>
                <Avatar classes={{ root: classes.avatarRoot }} src={info.imageUrl} />
              </ListItemIcon>
              <ListItemText primary={info.title} />
            </ListItem>
          ))}
        </AutoPlaySwipeableViews>

        <MobileStepper
          steps={5}
          position="static"
          activeStep={index}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={index === 4}>
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>}
          backButton={
            <Button size="small" onClick={handleBack} disabled={index === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </Button>}
        />
      </List>
    )
  )
})
