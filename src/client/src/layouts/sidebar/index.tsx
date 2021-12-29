import clsx from 'clsx'
import {
  Drawer,
  IconButton,
  Divider,
  makeStyles,
  List,
  Theme,
  createStyles
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListItems from './items'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { selectIsOpenSideBar, updateSidebar } from '../layoutSlice'

import logo from '../../assets/images/logo.png'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9)
      }
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    sidebarList: {
      paddingTop: '0'
    },
    logo: {
      marginRight: 35
    }
  })
)

const SideBar = () => {
  const classes = useStyles()
  const isOpenSidebar = useAppSelector(selectIsOpenSideBar)
  const dispatch = useAppDispatch()

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !isOpenSidebar && classes.drawerPaperClose
        )
      }}
      open={isOpenSidebar}
    >
      <div className={classes.toolbarIcon}>
        <img className={classes.logo} src={logo} alt='logo' />
        <IconButton onClick={() => dispatch(updateSidebar(false))}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className={classes.sidebarList}>
        <ListItems />
      </List>
    </Drawer>
  )
}

export default SideBar
