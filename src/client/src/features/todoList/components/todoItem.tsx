import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { deleteTodoAsync, TodoResponse } from '../todoSlice'
import { Checkbox, withStyles } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

const useStyles = makeStyles((theme) => ({
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
    textAlign: 'center'
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

export interface TodoItemProps {
  index: number
  item: TodoResponse
}

const TodoItem: FC<TodoItemProps> = ({ index, item }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()

  const handleDeleteTodo = async (id: string) => {
    try {
      const result = await dispatch(deleteTodoAsync(id)).unwrap()
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
    <Grid item md={12} xs={12}>
      <Card>
        <CardContentStyled>
          <Grid container>
            <Grid md={1} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
            </Grid>
            <Grid md={1}>
              <Checkbox
                checked={true}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid md={9} xs={7} className={classes.todoContent}>
              <Typography component='p' className={classes.todoTime}>
                {item.time}
              </Typography>
              <Typography component='p'>{item.description}</Typography>
            </Grid>
            <Grid
              md={1}
              className={classes.deleteTodo}
              onClick={() => handleDeleteTodo(item._id)}
            >
              <DeleteForeverIcon />
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default TodoItem
