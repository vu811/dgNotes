import { GoalType, ObjectiveType } from './enums/goalEnum'
import Looks5TwoToneIcon from '@material-ui/icons/Looks5TwoTone'
import EmojiTransportationTwoToneIcon from '@material-ui/icons/EmojiTransportationTwoTone'
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone'
import WorkIcon from '@material-ui/icons/Work'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'

export const goalTypes = [
  {
    name: 'Mục tiêu ' + new Date().getFullYear(),
    icon: <EmojiTransportationTwoToneIcon />,
    type: GoalType.ThisYear
  },
  {
    name: 'Mục tiêu 5 năm',
    icon: <Looks5TwoToneIcon />,
    type: GoalType.FiveYears
  },
  {
    name: 'Mục tiêu cuộc đời',
    icon: <EmojiEventsTwoToneIcon />,
    type: GoalType.Life
  }
]

interface objectTypeProps {
  name: string
  icon: any
  color: 'inherit' | 'primary' | 'secondary' | 'grey'
  variant: 'default' | 'outlined'
  type: ObjectiveType
}
export const objectiveTypes: objectTypeProps[] = [
  {
    name: 'Sự nghiệp',
    icon: <WorkIcon />,
    color: 'secondary',
    variant: 'outlined',
    type: ObjectiveType.Career
  },
  {
    name: 'Tài chính',
    icon: <MonetizationOnIcon />,
    color: 'primary',
    variant: 'default',
    type: ObjectiveType.Financial
  },
  {
    name: 'Gia đình',
    icon: <FavoriteIcon />,
    color: 'primary',
    variant: 'default',
    type: ObjectiveType.Family
  },
  {
    name: 'Cá nhân',
    icon: <AccessibilityNewIcon />,
    color: 'secondary',
    variant: 'default',
    type: ObjectiveType.Personal
  }
]
