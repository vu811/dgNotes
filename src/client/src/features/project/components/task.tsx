import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  withStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { green, grey, red } from '@material-ui/core/colors'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import {
  deleteTaskAsync,
  DeleteTaskPayload,
  openTaskModal,
  TaskProps,
  updateTaskAsync,
  UpdateTaskPayload
} from '../projectSlice'
import { getDate } from '../../../utils/dateTimeHelper'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export interface StyleProps {
  taskStatus: number
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    newProjectBtn: {
      marginBottom: '10px'
    },
    avatar: {
      backgroundColor: red[500]
    },
    boderCheckBox: {
      borderRight: `solid 2px ${theme.palette.primary.main}`
    },
    todoContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoNumber: {
      display: 'inline-block',
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(255, 25, 67, 0.1)',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoTime: {
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoNumberGrid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    deleteTodo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main,
      cursor: 'pointer'
    },
    startBtn: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    dueDateText: {
      fontSize: '0.8em',
      fontWeight: theme.typography.fontWeightBold as number
    },
    dueDate: {
      //fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.text.secondary
    },
    taskBackground: {
      backgroundColor: ({ taskStatus }) => {
        if (taskStatus === 0) return 'white'
        //else if (taskStatus === 1) return 'rgba(255, 163, 25, 0.1)'
        //else return 'rgba(76, 175, 80, 0.1)'
        else if (taskStatus === 1) return '#fae2a0'
        else return '#c9f8de'
      }
    }
  })
)

const CardContentStyled = withStyles({
  root: {
    padding: '10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
})(CardContent)

const ListItemIconStyled = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '30px'
    }
  })
)(ListItemIcon)

export interface TaskPropReponse {
  index: number
  projectId: string
  versionId: string
  task: TaskProps
}

const Task: FC<TaskPropReponse> = ({ index, projectId, versionId, task }) => {
  const styleProps: StyleProps = {
    taskStatus: task.completedDate ? 2 : task.startDate ? 1 : 0
  }
  const classes = useStyles(styleProps)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMoreButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleDeleteTask = async (id?: String) => {
    handleCloseMorePopup()
    try {
      const payload: DeleteTaskPayload = {
        projectId: projectId,
        versionId: versionId,
        taskId: id
      }
      const result = await dispatch(deleteTaskAsync(payload)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const hanldleEditTask = (task: TaskProps) => {
    handleCloseMorePopup()
    dispatch(openTaskModal(task))
  }

  const getTaskAction = (task: TaskProps) => {
    if (!task.startDate) return 'Bắt đầu'
    if (task.startDate && !task.completedDate) return 'Hoàn thành'
    if (task.startDate && task.completedDate) return 'Chưa hoàn thành'
  }

  const handleTaskAction = async (task: TaskProps) => {
    handleCloseMorePopup()
    try {
      const payload: UpdateTaskPayload = {
        projectId: projectId,
        versionId: versionId,
        taskId: task._id
      }
      if (!task.startDate) {
        payload.isStarted = true
      }
      if (task.startDate && !task.completedDate) {
        payload.isCompleted = true
      }
      if (task.startDate && task.completedDate) {
        payload.isCompleted = false
      }
      const result = await dispatch(updateTaskAsync(payload)).unwrap()
      if (result) {
        dispatch(
          flashAlert({
            message: 'Đã cập nhật thành công!',
            type: FlashType.Success
          })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  return (
    <Grid item md={12} xs={12}>
      <Card className={classes.taskBackground}>
        <CardContentStyled>
          <Grid container>
            <Grid md={2} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
              <span className={classes.dueDateText}>Due date</span>
              <span className={classes.dueDate}>{getDate(task.dueDate)}</span>
            </Grid>
            <Grid md={7} xs={7} className={classes.todoContent}>
              <Typography component='p'>{task.description}</Typography>
            </Grid>
            <Grid md={2} className={classes.startBtn}>
              {(task.startDate || task.completedDate) && (
                <>
                  <span className={classes.dueDateText}>
                    {task.startDate && task.completedDate
                      ? 'Completed date'
                      : 'Start date'}
                  </span>
                  <span className={classes.dueDate}>
                    {getDate(task.startDate)}
                  </span>
                </>
              )}
            </Grid>
            <Grid md={1} className={classes.deleteTodo}>
              <IconButton aria-label='more' onClick={handleClickMoreButton}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseMorePopup}
              >
                <MenuItem onClick={() => handleTaskAction(task)}>
                  <ListItemIconStyled>
                    <CheckCircleOutlineIcon style={{ color: green[500] }} />
                  </ListItemIconStyled>
                  <Typography>{getTaskAction(task)}</Typography>
                </MenuItem>
                <MenuItem onClick={() => hanldleEditTask(task)}>
                  <ListItemIconStyled>
                    <EditIcon style={{ color: grey[500] }} />
                  </ListItemIconStyled>
                  <Typography>Chỉnh sửa</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteTask(task._id)}>
                  <ListItemIconStyled>
                    <DeleteForeverIcon style={{ color: red[500] }} />
                  </ListItemIconStyled>
                  <Typography>Xóa</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default Task
