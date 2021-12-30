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
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Làm việc'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Tue',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Làm việc'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Wed',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Làm việc'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Thu',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Làm việc'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Fri',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Làm việc'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Sat',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Nghiên cứu/Làm dự án cá nhân'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  },
  {
    name: 'Sun',
    works: [
      {
        time: '05:00 - 06:00',
        descr: 'Tập thể dục'
      },
      {
        time: '06:00 - 07:00',
        descr: 'Học về đầu tư CK/Đọc sách'
      },
      {
        time: '07:00 - 08:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '08:00 - 09:00',
        descr: 'Coding excercise'
      },
      {
        time: '09:00 - 17:30',
        descr: 'Nghiên cứu/Làm dự án cá nhân'
      },
      {
        time: '17:00 - 18:00',
        descr: 'Tập thể dục'
      },
      {
        time: '18:00 - 19:00',
        descr: 'Nghỉ ngơi'
      },
      {
        time: '19:00 - 20:30',
        descr: 'Coding'
      },
      {
        time: '21:00 - 22:00',
        descr: 'Học tiếng Anh'
      },
      {
        time: '22:00',
        descr: 'Ngủ'
      }
    ]
  }
]
