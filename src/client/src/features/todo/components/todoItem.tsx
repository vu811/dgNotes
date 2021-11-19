import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {
  completeTodoAsync,
  deleteTodoAsync,
  getTodoByIdAsync,
  openTodoModal,
  TodoProps
} from '../todoSlice'
import {
  IconButton,
  Menu,
  MenuItem,
  Theme,
  withStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { green, grey, red } from '@material-ui/core/colors'
import { ListItemIcon } from '@material-ui/core'

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
  boderCheckBox: {
    borderRight: `solid 2px ${theme.palette.primary.main}`
  },
  todoContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    //color: ({ isCompleted }) => (isCompleted ? '#66bb6a' : 'lightslategrey'),
    //color: 'rgb(34, 51, 84)',
    fontWeight: theme.typography.fontWeightBold
  },
  todoDescr: {
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
  cardContent: {
    //color: ({ isCompleted }) => (isCompleted ? '#66bb6a' : 'rgb(34, 51, 84)'),
    color: 'rgb(34, 51, 84)',
    backgroundColor: ({ isCompleted }) => (isCompleted ? '#c9f8de' : 'white')
  },
  test: {
    padding: 0
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

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)
export interface TodoItemProps {
  index: number
  data: TodoProps
  sharingView?: boolean
}
export interface StyleProps {
  isCompleted?: boolean
}

const TodoItem: FC<TodoItemProps> = ({ index, data, sharingView }) => {
  const styleProps: StyleProps = {
    isCompleted: data.isCompleted
  }
  const classes = useStyles(styleProps)
  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMorePopup = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleEditTodo = async (id?: string) => {
    handleCloseMorePopup()
    const result = await dispatch(getTodoByIdAsync(id ?? '')).unwrap()
    if (result) {
      dispatch(openTodoModal({ isAddNew: false }))
    }
  }

  const handleCompleteTodo = async (id?: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(completeTodoAsync(id ?? '')).unwrap()
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

  const handleDeleteTodo = async (id?: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(deleteTodoAsync(id ?? '')).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContentStyled className={classes.cardContent}>
          <Grid container>
            <Grid md={1} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
            </Grid>
            <Grid md={10} xs={8} className={classes.todoContent}>
              <Typography
                variant='body2'
                color='textSecondary'
                component='p'
                className={classes.todoTime}
              >
                {data.time}
              </Typography>
              <Typography component='p' className={classes.todoDescr}>
                {data.description}
              </Typography>
            </Grid>
            {!sharingView && (
              <Grid md={1} className={classes.deleteTodo}>
                <IconButton aria-label='more' onClick={handleClickMorePopup}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  className={classes.test}
                  onClose={handleCloseMorePopup}
                >
                  <MenuItem onClick={() => handleCompleteTodo(data._id)}>
                    <ListItemIconStyled>
                      <CheckCircleOutlineIcon style={{ color: green[500] }} />
                    </ListItemIconStyled>
                    <Typography>
                      {data.isCompleted ? 'Chưa hoàn thành' : 'Hoàn thành'}
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleEditTodo(data._id)}>
                    <ListItemIconStyled>
                      <EditIcon style={{ color: grey[500] }} />
                    </ListItemIconStyled>
                    <Typography>Chỉnh sửa</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteTodo(data._id)}>
                    <ListItemIconStyled>
                      <DeleteForeverIcon style={{ color: red[500] }} />
                    </ListItemIconStyled>
                    <Typography>Xóa</Typography>
                  </MenuItem>
                </Menu>
              </Grid>
            )}
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default TodoItem
