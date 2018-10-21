import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {ITopic} from '@cc98/api';
import {css} from 'emotion';
import { navigate } from '@reach/router'
type Props={
    data:ITopic
}

const root = css`
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const text = css`&&{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    padding-left:0px;
    padding-right:0px;
}`;
const subText=css`&&{
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:100%;
    padding-left:0px;
    padding-right:0px;
    p{
        width:100%;
    }
}`;
export default class extends React.PureComponent<Props>{
    render(){
        const {data} = this.props;
        let title = data.title.substr(0,10);
        if(title.length>9)title+="...";
        return (
        <ListItem onClick={()=>navigate(`/topic/${data.id}`)} className={root} button>
        <ListItemText className={text} primary={title} secondary={data.lastPostTime} />
        <ListItemText className={subText} secondary={<div className={text}><div>{"作者:"+data.userName}</div><div>{"回复:"+data.replyCount}</div></div>} />
        </ListItem>)
    }
}
