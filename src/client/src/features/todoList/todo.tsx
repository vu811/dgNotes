import 'date-fns'
import { useEffect, useState } from 'react'
import {
  MuiPickersUtilsProvider,
  DatePicker,
  KeyboardTimePicker
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import {
  Grid,
  makeStyles,
  Theme,
  TextField,
  withStyles,
  Container
} from '@material-ui/core'
import Modal from '../../common/components/modal'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  closeTodoModal,
  openTodoModal,
  TodoProps,
  getTodosAsync,
  addTodoAsync,
  TodoResponse
} from './todoSlice'

import { getTime, getDate } from '../../utils/dateTimeHelper'
import TodoItem from './components/todoItem'

const validationTodoSchema = yup.object({
  startTime: yup.date(),
  endTime: yup.date(),
  description: yup
    .string()
    .required('Vui lòng nhập ngày bắt đầu')
    .max(100, 'Tối đa 100 kí tự')
})

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

  const formik = useFormik({
    initialValues: {
      time: new Date(),
      description: ''
    },
    validationSchema: validationTodoSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: TodoProps = {
        date: getDate(todoDate),
        time: getTime(values.time),
        description: values.description
      }
      const saved = await dispatch(addTodoAsync(payload)).unwrap()
      if (saved) resetForm()
    }
  })

  console.log(formik)
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
          {todos &&
            todos.map((todo: TodoResponse, index: number) => (
              <TodoItem index={index} item={todo} />
            ))}
        </Grid>
        <div>
          <Modal
            open={isOpenTodoModal}
            onClose={() => dispatch(closeTodoModal())}
            onSubmit={formik.handleSubmit}
          >
            <form noValidate autoComplete='off'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                  id='time'
                  name='time'
                  label='Thời gian'
                  mask='__:__ _M'
                  value={formik.values.time}
                  onChange={(val) => {
                    console.log('start')
                    formik.setFieldValue('time', val)
                  }}
                  color='secondary'
                  okLabel='Chọn'
                  cancelLabel='Hủy'
                />
              </MuiPickersUtilsProvider>
              <TextField
                id='description'
                name='description'
                label='Nội dung'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.description)}
                helperText={formik.errors.description}
                placeholder='Nội dung'
                fullWidth
                color='secondary'
                margin='normal'
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Modal>
        </div>
      </Grid>
    </Container>
  )
}

export default Todo
