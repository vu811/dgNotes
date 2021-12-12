import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { menuItems } from '../helpers/menuItemHelper'
import { useHistory } from 'react-router-dom'
import { MenuEnum } from '../../enums/menuEnum'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import { grey } from '@material-ui/core/colors'
import EditIcon from '@material-ui/icons/Edit'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setNavigator } from '../../app/appSlice'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100vw',
      position: 'fixed',
      top: 'calc(100vh - 56px)',
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    }
  })
)

const ButtomNavigator = () => {
  const classes = useStyles()
  const history = useHistory()

  const navigator = useAppSelector((state) => state.app.navigator)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMorePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleChange = (event: React.ChangeEvent<{}>, newNavigator: number) => {
    dispatch(setNavigator(newNavigator))
  }

  return (
    <BottomNavigation
      value={navigator}
      onChange={handleChange}
      className={classes.root}
    >
      {menuItems(history)
        ?.filter((x) => x.showNavigator)
        .map((item) => (
          <BottomNavigationAction
            label={item.name}
            value={item.value}
            icon={item.icon}
            onClick={item.onClick}
          />
        ))}
      <div>
        <IconButton aria-label='more' onClick={handleClickMorePopup}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMorePopup}
        >
          {menuItems(history)
            ?.filter((x) => !x.showNavigator)
            .map((item) => (
              <MenuItem onClick={item.onClick}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <Typography>{item.name}</Typography>
              </MenuItem>
            ))}
        </Menu>
      </div>
    </BottomNavigation>
  )
}
export default ButtomNavigator
