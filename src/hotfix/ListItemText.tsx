import React from 'react'

import { ListItemText, Typography } from '@material-ui/core'
import { ListItemTextProps } from '@material-ui/core/ListItemText'

const ListItemText_FixedThemeBug: React.FC<ListItemTextProps> = props => (
  <ListItemText
    primary={
      <Typography variant="body1" color="textPrimary">
        {props.primary}
      </Typography>
    }
    secondary={
      <Typography variant="body2" color="textSecondary">
        {props.secondary}
      </Typography>
    }
  />
)

export default ListItemText_FixedThemeBug
