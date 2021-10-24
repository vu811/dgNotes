import 'date-fns'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import {
  Grid,
  makeStyles,
  Theme,
  withStyles,
  Container,
  Typography
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  closeTodoModal,
  openTodoModal,
  getTodosAsync,
  TodoProps
} from './todoSlice'

import { getDate } from '../../utils/dateTimeHelper'
import TodoItem from './components/todoItem'
import TodoModal from './components/todoModal'
import NoItemPage from '../../common/components/noItemPage'
import { getUrlQuery } from '../../utils/commonHelper'
import { withContainer } from '../../layouts/container'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  addTodoBtnWrapper: {
    display: 'inline-flex',
    marginLeft: '30px',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  addTodoBtn: {
    [theme.breakpoints.down('xs')]: {
      '& .MuiButton-startIcon': {
        marginLeft: 0,
        marginRight: 0
      }
    }
  },
  addTodoBtnText: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
  todoDate: {
    verticalAlign: 'bottom'
  },
  todoDateInput: {
    fontWeight: theme.typography.fontWeightBold
  },
  todoList: {
    marginTop: '5px'
    // [theme.breakpoints.up('md')]: {
    //   maxHeight: 'calc(100vh - 225px)',
    //   overflowY: 'auto'
    // }
  },
  navigator: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

const DatePickerStyled = withStyles({
  input: {
    fontWeight: 700
  }
})(DatePicker)

const Todo = ({ currentUser }: any) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()
  const todoDate = getUrlQuery(location.search)
    ? getUrlQuery(location.search)
    : getDate(new Date(), true)

  const todos = useAppSelector((state) => state.todo.todos)
  const isOpenTodoModal = useAppSelector((state) => state.todo.isOpenTodoModal)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser) {
      const payload = {
        userId: currentUser?._id,
        date: todoDate
      }
      dispatch(getTodosAsync(payload))
    }
  }, [currentUser?._id, todoDate])

  const handleChangeTodoDate = (date: any) => {
    history.push(`/todos?date=${getDate(date, true)}`)
  }

  return (
    <Container maxWidth='md'>
      <Grid>
        <div className={classes.navigator}>
          <Typography variant='subtitle1'>Todo list</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerStyled
              id='startDate'
              name='startDate'
              label='Ngày'
              value={todoDate}
              color='secondary'
              format='dd/MM/yyyy'
              className={classes.todoDate}
              onChange={(val) => handleChangeTodoDate(val)}
              inputProps={{ className: classes.todoDateInput }}
              InputLabelProps={{ className: classes.todoDateInput }}
            />
          </MuiPickersUtilsProvider>
          <div className={classes.addTodoBtnWrapper}>
            <Button
              variant='contained'
              color='secondary'
              startIcon={<AddCircleOutlineIcon />}
              className={classes.addTodoBtn}
              onClick={() => dispatch(openTodoModal({ isAddNew: true }))}
            >
              <span className={classes.addTodoBtnText}>thêm</span>
            </Button>
          </div>
        </div>
        <Grid container spacing={2} className={classes.todoList}>
          {todos && todos.length > 0 ? (
            todos.map((todo: TodoProps, index: number) => (
              <TodoItem index={index} data={todo} />
            ))
          ) : (
            <NoItemPage text='Chưa có tu-đu nào!' />
          )}
        </Grid>
      </Grid>
      {isOpenTodoModal && (
        <TodoModal
          date={todoDate}
          open={isOpenTodoModal}
          close={() => dispatch(closeTodoModal())}
          currentUser={currentUser}
        />
      )}
    </Container>
  )
}

export default withContainer(Todo)
