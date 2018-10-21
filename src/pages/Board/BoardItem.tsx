import React from 'react';
import {IBoard} from '@cc98/api';
import {css} from 'emotion';
import { navigate } from '@reach/router';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
type Props = {
    data:IBoard;
}


const CardStyle=css`&&{
    margin:0.25rem 0.25rem 0.25rem 0.25rem;
    font-size:0.8rem;
    padding-left:0.2rem;
    padding-right:0.2rem;
    padding-top:0;
    padding-bottom:0;
    min-height:32px;
    min-width:80px;
}`
export default class extends React.PureComponent<Props>{
    render(){
        const {data}=this.props;
        return  (
             <Button onClick={()=>navigate(`/board/${data.id}/1`)} className={CardStyle} variant="outlined" > {data.name}</Button>


      )
    }
}
