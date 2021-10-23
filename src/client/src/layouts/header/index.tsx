import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { selectIsOpenSideBar, updateSidebar } from '../layoutSlice'

import { useHistory } from 'react-router-dom'
import { Avatar, LinearProgress } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { logoutAsync } from '../../auth/authSlice'

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
  }
}))

const Header = () => {
  const classes = useStyles()
  const isOpenSidebar = useAppSelector(selectIsOpenSideBar)
  const dispatch = useAppDispatch()
  const history = useHistory()

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
          <IconButton>
            <Avatar>V</Avatar>
          </IconButton>
          <Typography variant='subtitle1' component='span'>
            Vu Nguyen
          </Typography>
          <IconButton onClick={handleLogout}>
            <ExitToAppIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} />
          </IconButton>
        </Toolbar>
        {/* <LinearProgress variant='determinate' value={67} color='secondary' /> */}
      </AppBar>
    </>
  )
}

export default Header
