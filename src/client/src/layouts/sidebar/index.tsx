import clsx from 'clsx'
import { Drawer, IconButton, Divider, makeStyles, List } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { ListItems } from '../../common/constants/listItems'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { selectIsOpenSideBar, updateSidebar } from '../layoutSlice'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
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
  }
}))

const SideBar = () => {
  const classes = useStyles()
  const isOpenSidebar = useAppSelector(selectIsOpenSideBar)
  const dispatch = useAppDispatch()

  return (
    <Drawer
      variant='permanent'
      classes={{
        paper: clsx(classes.drawerPaper, !isOpenSidebar && classes.drawerPaperClose)
      }}
      open={isOpenSidebar}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={() => dispatch(updateSidebar(false))}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{ListItems}</List>
    </Drawer>
  )
}

export default SideBar
