import { PUT } from '@/utils/fetch'
import { IUser } from '@cc98/api';
import { IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import { ClassNameMap, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { navigate } from '@reach/router';
import { css } from 'emotion';
import React, { CSSProperties } from 'react';
const goback = () => window.history.back()
interface Props {
  info: IUser
}
interface State {
  newInfo: IUser
  disabled: boolean
  buttonInfo: string
}

const root = css`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  height: 56px;
  padding: 0 18px;
  background-color: #fff;
  /* z-index of TopBar is 1100 and DrawerMenu is 1200 */
  z-index: 1105;
  width:100%;
  @media (min-width: 600px) {
    height: 64px;
  }
`
const gobackIcon = css`
  && {
    margin-left: -12px;
    margin-right: 5px;
  }
`

const styles: StyleRulesCallback = (theme: Theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
}
)
export default withStyles(styles)(
  class extends React.Component<Props & { classes: ClassNameMap }, State> {

    constructor(props: Props & { classes: ClassNameMap }) {
      super(props);
      this.state = {
        newInfo: props.info,
        buttonInfo: '修改',
        disabled: false,
      }
    }

    handleChange = (name: keyof IUser) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const info: IUser = Object.assign({}, this.state.newInfo);
      info[name] = e.target.value;
      this.setState({
        newInfo: info,
      })
    }

    submit = async () => {
      this.setState(
        {
          disabled: true,
          buttonInfo: '...',
        })
      const submitTry = await PUT('/me');
      submitTry
        .fail(
          () => {
            this.setState({ disabled: false });
          }
        )
        .succeed(
          () => {
            this.setState({ disabled: false, buttonInfo: '修改' });
            navigate('/userCenter');
          }
        )
    }

    render() {
      const { classes, info } = this.props;
      const { newInfo, disabled, buttonInfo } = this.state;

      return (
        <form className={classes.container} noValidate autoComplete="off">
          <div className={root}>
            <IconButton className={gobackIcon} onClick={goback}>
              <KeyboardBackspaceIcon />
            </IconButton>
            <Typography variant="subtitle2">编辑个人信息</Typography>
          </div>
          <TextField
            id="outlined-name"
            label="性别"
            className={classes.textField}
            value={newInfo.gender === 1 ? '男' : '女'}
            onChange={this.handleChange('gender')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="签名档"
            className={classes.textField}
            value={newInfo.signatureCode}
            onChange={this.handleChange('signatureCode')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="QQ"
            className={classes.textField}
            value={newInfo.qq}
            onChange={this.handleChange('qq')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="邮箱"
            className={classes.textField}
            value={newInfo.emailAddress}
            onChange={this.handleChange('emailAddress')}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="个人简介"
            className={classes.textField}
            value={newInfo.introduction}
            onChange={this.handleChange('introduction')}
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" disabled={disabled} onClick={this.submit}>{buttonInfo}</Button>
        </form>
      )
    }
  }
)
