import 'date-fns'
import { useEffect, useState } from 'react'
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
  Container
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  closeTodoModal,
  openTodoModal,
  getTodosAsync,
  TodoResponse
} from './todoSlice'

import { getDate } from '../../utils/dateTimeHelper'
import TodoItem from './components/todoItem'
import TodoModal from './components/todoModal'
import NoItemPage from '../../common/components/noItemPage'

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
    marginTop: '5px',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 225px)',
      overflowY: 'auto'
    }
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

const Todo = () => {
  const classes = useStyles()

  const todos = useAppSelector((state) => state.todo.todos)
  const isOpenTodoModal = useAppSelector((state) => state.todo.isOpenTodoModal)
  const dispatch = useAppDispatch()
  const [todoDate, setTodoDate] = useState<Date>(new Date())

  useEffect(() => {
    dispatch(getTodosAsync(getDate(todoDate)))
  }, [todoDate])

  return (
    <Container maxWidth='sm'>
      <Grid>
        <div className={classes.navigator}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerStyled
              id='startDate'
              name='startDate'
              label='Ngày'
              value={todoDate}
              color='secondary'
              format='dd/MM/yyyy'
              className={classes.todoDate}
              onChange={(val) => setTodoDate(val ?? new Date())}
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
              onClick={() => dispatch(openTodoModal())}
            >
              <span className={classes.addTodoBtnText}>thêm todo</span>
            </Button>
          </div>
        </div>
        <Grid container spacing={2} className={classes.todoList}>
          {todos && todos.length > 0 ? (
            todos.map((todo: TodoResponse, index: number) => (
              <TodoItem index={index} item={todo} />
            ))
          ) : (
            <NoItemPage text='Chưa có todo nào!' />
          )}
        </Grid>
      </Grid>
      <TodoModal
        date={todoDate}
        open={isOpenTodoModal}
        close={() => dispatch(closeTodoModal())}
      />
    </Container>
  )
}

export default Todo
