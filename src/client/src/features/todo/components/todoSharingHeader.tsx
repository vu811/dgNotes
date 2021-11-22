import {
  Avatar,
  makeStyles,
  Typography,
  Theme,
  createStyles
} from '@material-ui/core'
import avatar from '../../../assets/images/avatar.png'
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone'
import { useAppSelector } from '../../../app/hooks'
import { getDate } from '../../../utils/dateTimeHelper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    date: {
      display: 'flex',
      alignItems: 'center'
    }
  })
)

const TodoSharingHeader = () => {
  const classes = useStyles()
  const shareInfo = useAppSelector((state) => state.todo.shareInfo)

  return shareInfo ? (
    <div className={classes.root}>
      <Avatar alt='Avatar' src={avatar} />
      <Typography variant='subtitle1'>
        Danh sách todo của {shareInfo.sharedUsername}
      </Typography>
      <div className={classes.date}>
        <DateRangeTwoToneIcon style={{ color: 'blueviolet' }} />
        <Typography variant='subtitle2' component='span'>
          {getDate(shareInfo.date)}
        </Typography>
      </div>
    </div>
  ) : null
}

export default TodoSharingHeader
