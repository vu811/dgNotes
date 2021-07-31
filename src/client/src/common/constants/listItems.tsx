import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded'
import { styled, withStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'

const ListItem = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#e0dede',
      color: '#e62739',
      '& .MuiListItemIcon-root': {
        color: '#e62739'
      },
      '&:before': {
        top: '0',
        right: '0',
        bottom: '0',
        width: '3px',
        content: '""',
        position: 'absolute',
        backgroundColor: '#e62739',
        borderTopLeftRadius: '4px',
        borderBottomLeftRadius: '4px'
      }
    },
    '&$selected:hover': {
      backgroundColor: '#e0dede',
      color: '#e62739',
      '& .MuiListItemIcon-root': {
        color: '#e62739'
      }
    },
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
      color: '#637381',
      '& .MuiListItemIcon-root': {
        color: '#637381'
      }
    }
  },
  selected: {}
})(MuiListItem)

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    paddingLeft: `23px`
  }
}))

const ListItems = () => {
  const history = useHistory()
  const location = useLocation()
  return (
    <div>
      <ListItemStyle button selected={location.pathname === '/'} onClick={() => history.push('/')}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItemStyle>
      <ListItemStyle button selected={location.pathname === '/projects'} onClick={() => history.push('/projects')}>
        <ListItemIcon>
          <CodeRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Project management' />
      </ListItemStyle>
      <ListItemStyle button>
        <ListItemIcon>
          <TrackChangesRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Goal management' />
      </ListItemStyle>
      <ListItemStyle button>
        <ListItemIcon>
          <SettingsRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Setting' />
      </ListItemStyle>
    </div>
  )
}
export default ListItems
