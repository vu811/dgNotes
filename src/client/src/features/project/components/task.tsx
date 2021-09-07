import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { red } from '@material-ui/core/colors'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Theme, withStyles } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import {
  deleteTaskAsync,
  DeleteTaskPayload,
  TaskProps,
  updateTaskAsync,
  UpdateTaskPayload
} from '../projectSlice'
import { getDate } from '../../../utils/dateTimeHelper'

export interface StyleProps {
  taskStatus: number
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
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
    fontWeight: theme.typography.fontWeightBold
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
    fontWeight: theme.typography.fontWeightBold
  },
  todoTime: {
    fontWeight: theme.typography.fontWeightBold
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
    fontWeight: theme.typography.fontWeightBold
  },
  dueDate: {
    fontWeight: theme.typography.fontWeightBold
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
}))

const CardContentStyled = withStyles({
  root: {
    padding: '10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
})(CardContent)

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

  const handleDelete = async (id?: String) => {
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

  const handleUpdateTask = (id?: String, isCompleted = false) => {
    const payload: UpdateTaskPayload = {
      projectId: projectId,
      versionId: versionId,
      taskId: id,
      isStarted: !isCompleted,
      isCompleted: isCompleted
    }
    dispatch(updateTaskAsync(payload))
  }

  return (
    <Grid item md={12} xs={12}>
      <Card className={classes.taskBackground}>
        <CardContentStyled>
          <Grid container>
            <Grid md={2} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
              <span className={classes.dueDateText}>Ngày đến hạn</span>
              <span className={classes.dueDate}>{getDate(task.dueDate)}</span>
            </Grid>
            <Grid md={7} xs={7} className={classes.todoContent}>
              <Typography component='p'>{task.description}</Typography>
            </Grid>
            <Grid md={2} className={classes.startBtn}>
              {!task.startDate && (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleUpdateTask(task._id)}
                >
                  Bắt đầu
                </Button>
              )}
              {task.startDate && !task.completedDate && (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => handleUpdateTask(task._id, true)}
                >
                  Hoàn thành
                </Button>
              )}
              {(task.startDate || task.completedDate) && (
                <>
                  <span className={classes.dueDateText}>
                    {task.startDate && task.completedDate
                      ? 'Ngày hoàn thành'
                      : 'Ngày bắt đầu'}
                  </span>
                  <span className={classes.dueDate}>
                    {getDate(task.startDate)}
                  </span>
                </>
              )}
            </Grid>
            <Grid
              md={1}
              className={classes.deleteTodo}
              onClick={() => handleDelete(task._id)}
            >
              <DeleteForeverIcon />
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default Task
