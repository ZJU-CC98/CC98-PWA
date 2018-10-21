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

const BoardItemStyle=css`
    margin-left:1rem;
    margin-left:1rem;
`;
const CardStyle=css`&&{
    margin:0.5rem 0.5rem 0.5rem 0.5rem;
}`
export default class extends React.PureComponent<Props>{
    render(){
        const {data}=this.props;
        return  ( 
             <Button onClick={()=>navigate(`/board/${data.id}/1`)} className={CardStyle} variant="outlined" color="primary"> {data.name}</Button>
           
              
      )
    }
}