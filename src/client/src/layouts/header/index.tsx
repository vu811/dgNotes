import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectIsOpenSideBar, updateSidebar } from '../layoutSlice'
import { useHistory } from 'react-router-dom'
import {
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  withStyles
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { logoutAsync } from '../../auth/authSlice'
import avatar from '../../assets/images/avatar.jpg'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  logoText: {
    cursor: 'pointer',
    fontWeight: theme.typography.fontWeightBold
  },
  profileIcon: {
    color: theme.palette.primary.main
  }
}))

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: 30
  }
}))(ListItemIcon)

const Header = () => {
  const classes = useStyles()
  const isOpenSidebar = useAppSelector(selectIsOpenSideBar)
  const dispatch = useAppDispatch()
  const history = useHistory()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const goToHome = () => {
    history.push('/')
  }

  const handleLogout = () => {
    dispatch(logoutAsync())
    history.push('/auth/login')
  }

  return (
    <>
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, isOpenSidebar && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={() => dispatch(updateSidebar(true))}
            className={clsx(
              classes.menuButton,
              isOpenSidebar && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            <span className={classes.logoText} onClick={goToHome}>
              dgNOTES
            </span>
          </Typography>
          {/* <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton onClick={handleClick}>
            <Avatar src={avatar} />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <List component='nav' aria-label='user avatar'>
              <ListItem button>
                <ListItemIconStyled>
                  <AccountCircleIcon />
                </ListItemIconStyled>
                <ListItemText primary='Tài khoản' />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemIconStyled>
                  <ExitToAppIcon />
                </ListItemIconStyled>
                <ListItemText primary='Đăng xuất' />
              </ListItem>
            </List>
          </Popover>
        </Toolbar>
        {/* <LinearProgress variant='determinate' value={67} color='secondary' /> */}
      </AppBar>
    </>
  )
}

export default Header
