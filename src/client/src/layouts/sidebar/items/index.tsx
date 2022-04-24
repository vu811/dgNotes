import MuiListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { styled, withStyles } from '@material-ui/core/styles'
import { useHistory, useLocation } from 'react-router-dom'
import { menuItems } from '../../helpers/menuItemHelper'

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

  const isItemSelected = (paths: string[], currentPath: string) => {
    if (paths.includes(currentPath)) return true
    if (paths.length > 1) return false
    if (currentPath.includes(paths[0])) return true
    return false
  }

  return (
    <>
      {menuItems(history)?.map((item) => (
        <ListItemStyle
          button
          selected={isItemSelected(item.path, location.pathname)}
          onClick={item.onClick}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText style={{ fontWeight: 900 }} primary={item.name} />
        </ListItemStyle>
      ))}
    </>
  )
}
export default ListItems
