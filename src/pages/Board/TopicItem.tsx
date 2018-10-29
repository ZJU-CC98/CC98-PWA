import { ITopic } from '@cc98/api'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { navigate } from '@reach/router'
import { css } from 'emotion'
import React from 'react'
interface Props {
  data: ITopic
}

const root = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const text = css`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }
`
const subText = css`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    p {
      width: 100%;
    }
  }
`
const PrimaryText = css`
  display:flex;
  width:100%;
  justify-content:space-between;
  flex-wrap:nowrap;
`
const Title = css`
  display:flex;
  flex-grow:2;
  overflow:hidden;
`
const TitleText = css`
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
`
const Time = css`
  color:rgba(0, 0, 0, 0.54);
  font-size:0.875rem;
  white-space:nowrap;
`
export default class extends React.PureComponent<Props> {
  render() {
    const { data } = this.props
    const title = data.title

    return (
      <ListItem onClick={() => navigate(`/topic/${data.id}`)} className={root} button>

        <div className={PrimaryText}>
          <div className={Title}><div className={TitleText}>{title}</div></div>
          <div className={Time}>{new Date(data.lastPostTime).toLocaleString()}</div>
        </div>
        <ListItemText
          className={subText}
          secondary={
            <div className={text}>
              <div>{`作者:${data.userName ? data.userName : '匿名'}`}</div>
              <div>{`回复:${data.replyCount}`}</div>
            </div>}
        />
      </ListItem>
    )
  }
}
