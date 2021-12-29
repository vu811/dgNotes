import DashboardIcon from '@material-ui/icons/Dashboard'
import CodeRoundedIcon from '@material-ui/icons/CodeRounded'
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded'
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import PlaylistAddCheckTwoToneIcon from '@material-ui/icons/PlaylistAddCheckTwoTone'
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded'
import { MenuEnum } from '../../enums/menuEnum'

interface MenuItemProps {
  name: string
  value: MenuEnum
  path: Array<string>
  onClick: () => void
  icon: any
  showNavigator: boolean
}

export const menuItems = (history: any): MenuItemProps[] => {
  return [
    {
      name: 'Dashboard',
      value: MenuEnum.Dashboard,
      path: ['/', '/app/dashboard'],
      onClick: () => history.push('/'),
      icon: <DashboardIcon />,
      showNavigator: true
    },
    {
      name: 'Scheduler',
      value: MenuEnum.Scheduler,
      path: ['/app/scheduler'],
      onClick: () => history.push('/app/scheduler'),
      icon: <EventNoteRoundedIcon />,
      showNavigator: true
    },
    {
      name: 'Todo',
      value: MenuEnum.Todo,
      path: ['/app/todo'],
      onClick: () => history.push('/app/todo'),
      icon: <PlaylistAddCheckTwoToneIcon />,
      showNavigator: true
    },
    {
      name: 'Project',
      value: MenuEnum.Project,
      path: ['/app/project'],
      onClick: () => history.push('/app/project'),
      icon: <CodeRoundedIcon />,
      showNavigator: false
    },
    {
      name: 'Goal',
      value: MenuEnum.Goal,
      path: ['/app/goal'],
      onClick: () => history.push('/app/goal'),
      icon: <TrackChangesRoundedIcon />,
      showNavigator: true
    },
    {
      name: 'Bucket list',
      value: MenuEnum.BucketList,
      path: ['/app/bucket-list'],
      onClick: () => history.push('/app/bucket-list'),
      icon: <FormatListNumberedIcon />,
      showNavigator: false
    },
    {
      name: 'Setting',
      value: MenuEnum.Setting,
      path: ['/app/setting'],
      onClick: () => {},
      icon: <SettingsRoundedIcon />,
      showNavigator: false
    }
  ]
}
