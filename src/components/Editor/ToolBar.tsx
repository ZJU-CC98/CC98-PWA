import { BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Photo from '@material-ui/icons/Photo'
import Send from '@material-ui/icons/Send'
import React from 'react'
interface Props {
  sendLoading: boolean
  handlePic: (files: FileList) => Promise<void>
  onPost: () => Promise<void>
}
const bottomBar: React.CSSProperties = {
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  justifyContent: 'space-between',
}
const bottomButton = {
  maxWidth: '100px',
}
export default class extends React.PureComponent<Props> {
  uploadFile = React.createRef<HTMLInputElement>()

  clickUpload = () => {
    if (this.uploadFile.current) this.uploadFile.current.click()
  }

  render() {
    const { handlePic, onPost } = this.props
    const sendIcon = this.props.sendLoading ? <CircularProgress size={30} /> : <Send />

    return (
      <>
        <input
          type="file"
          name="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              handlePic(e.target.files)
            }
          }}
          style={{ display: 'none' }}
          ref={this.uploadFile}
          multiple
          accept="image/*"
        />
        <BottomNavigation style={bottomBar}>
          <BottomNavigationAction
            icon={<Photo />}
            style={bottomButton}
            onClick={this.clickUpload}
          />
          <BottomNavigationAction icon={sendIcon} style={bottomButton} onClick={onPost} />
        </BottomNavigation>
      </>
    )
  }
}
