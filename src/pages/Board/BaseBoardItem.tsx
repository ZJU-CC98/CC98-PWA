import React from 'react';
import { IBaseBoard,IBoard } from '@cc98/api';
import { css } from 'emotion';
import BoardItem from './BoardItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



type Props = {
    data: IBaseBoard
}
type State={
    checked:boolean
}
const root = css`
    border-bottom: #eaeaea solid thin;
    `;
const BaseBoardStyle=css`
    display: flex;
    justify-content:space-between;
    align-items:center;
    padding-left:1rem;
`;
const ChildBoardStyle=css`
    display:flex;
    max-width:100%;
    flex-wrap:wrap;
    margin-bottom:1rem;
`;
export default class extends React.Component<Props,State>{
    state:State = {
        checked: false,
      };
    
      handleChange = () => {
        this.setState(state => ({ checked: !state.checked }));
      };
    
      render() {
        const { data } = this.props;
        const { checked } = this.state;
        console.log(data.boards);
        return (
            <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={BaseBoardStyle}>{data.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails  className={ChildBoardStyle}>

              {data.boards.map((board)=><BoardItem data={board} />)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      }
}
