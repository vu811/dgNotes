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

export const schedulers = [
  {
    name: 'Mon',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 18:00',
        descr: 'At work'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Tue',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 18:00',
        descr: 'At work'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Wed',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 18:00',
        descr: 'At work'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Thu',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 18:00',
        descr: 'At work'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Fri',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 18:00',
        descr: 'At work'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Sat',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 12:00',
        descr: 'Build vContractors'
      },
      {
        time: '13:30 - 14:45',
        descr: 'Interview prepare'
      },
      {
        time: '15:00 - 18:00',
        descr: 'IELTS, movie English...'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Sun',
    works: [
      {
        time: '05:45 - 07:45',
        descr: 'DSA (30m) - Review knowledge'
      },
      {
        time: '08:00 - 12:00',
        descr: 'Build vContractors'
      },
      {
        time: '13:30 - 14:45',
        descr: 'Interview prepare'
      },
      {
        time: '15:00 - 18:00',
        descr: 'IELTS, movie English...'
      },
      {
        time: '18:00 - 18:30',
        descr: 'Relax'
      },
      {
        time: '18:30 - 19:00',
        descr: 'Learning investment'
      },
      {
        time: '19:00 - 19:45',
        descr: 'Learning English in apps, watch videos'
      },
      {
        time: '20:00 - 21:45',
        descr: 'Build vContractors'
      },
      {
        time: '22:00 - 23:00',
        descr: 'IELTS'
      },
      {
        time: '23:00',
        descr: 'Ngủ'
      }
    ]
  }
]
