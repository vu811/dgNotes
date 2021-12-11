import { Avatar, makeStyles, Theme, createStyles } from '@material-ui/core'
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
      alignItems: 'center',
      fontWeight: 900
    },
    helperText: {
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium
    },
    username: {
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
      fontSize: 16
    }
  })
)

const TodoSharingHeader = () => {
  const classes = useStyles()
  const shareInfo = useAppSelector((state) => state.todo.shareInfo)

  return shareInfo ? (
    <div className={classes.root}>
      <Avatar alt='Avatar' src={avatar} />
      <div>
        <span className={classes.helperText}>
          Danh sách todo của{' '}
          <span className={classes.username}>{shareInfo.sharedUsername}</span>
        </span>
      </div>
      <div className={classes.date}>
        <DateRangeTwoToneIcon style={{ color: 'blueviolet' }} />
        {getDate(shareInfo.date)}
      </div>
    </div>
  ) : null
}

export default TodoSharingHeader
