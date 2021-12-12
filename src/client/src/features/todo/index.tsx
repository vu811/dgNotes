import 'date-fns'
import { FC, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import ClearIcon from '@material-ui/icons/Clear'
import {
  Grid,
  makeStyles,
  Theme,
  withStyles,
  Container,
  Typography,
  createStyles
} from '@material-ui/core'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  closeTodoModal,
  openTodoModal,
  getTodosAsync,
  TodoProps,
  openCopyModal,
  closeCopyModal,
  GetTodoPayload,
  clearTodosAsync,
  closeClearTodoConfirmModal,
  openClearTodoConfirmModal,
  getSharingTodosAsync,
  shareTodosAsync,
  openSharingModal,
  closeSharingModal,
  setLoading
} from './todoSlice'
import { getDate } from '../../utils/dateTimeHelper'
import TodoItem from './components/todoItem'
import TodoModal from './components/todoModal'
import NoItemPage from '../../common/components/noItemPage'
import { getUrlQuery } from '../../utils/commonHelper'
import { withContainer } from '../../layouts/container'
import CopyModal from './components/copyModal'
import { flashAlert } from '../../app/appSlice'
import { FlashType } from '../../enums'
import ClearTodoConfirmModal from './components/clearTodoConfirmModal'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import { CurrentUserProps } from '../../auth/authSlice'
import SharingModal from './components/sharingModal'
import TodoSharingHeader from './components/todoSharingHeader'

const useStyles = makeStyles<Theme, TodoStyleProps>((theme: Theme) =>
  createStyles({
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
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoList: {
      marginTop: '5px',
      [theme.breakpoints.up('md')]: {
        maxHeight: ({ sharingView }) =>
          sharingView ? 'calc(100vh - 269px)' : 'calc(100vh - 225px)',
        overflowY: 'auto'
      }
    },
    navigator: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    copyBtn: {
      marginRight: '5%'
    },
    todoContainer: {
      paddingLeft: 6,
      paddingRight: 6
    }
  })
)

const DatePickerStyled = withStyles({
  input: {
    fontWeight: 700
  }
})(DatePicker)

interface TodoTypeProps extends CurrentUserProps {
  sharingView?: boolean
}

interface ParamTypes {
  sharingId: string
}

interface TodoStyleProps {
  sharingView?: boolean
}

const Todo: FC<TodoTypeProps> = ({ sharingView, currentUser }) => {
  const styleProps: TodoStyleProps = {
    sharingView
  }
  const classes = useStyles(styleProps)
  const location = useLocation()
  const history = useHistory()
  const todoDate = getUrlQuery(location.search)
    ? getUrlQuery(location.search)
    : getDate(new Date(), true)

  const todos = useAppSelector((state) => state.todo.todos)
  const isOpenTodoModal = useAppSelector((state) => state.todo.isOpenTodoModal)
  const isOpenCopyModal = useAppSelector((state) => state.todo.isOpenCopyModal)
  const isOpenClearTodoConfirmModal = useAppSelector(
    (state) => state.todo.isOpenClearTodoConfirmModal
  )
  const isOpenSharingModal = useAppSelector(
    (state) => state.todo.isOpenSharingModal
  )
  const loading = useAppSelector((state) => state.todo.loading)
  let { sharingId } = useParams<ParamTypes>()
  const dispatch = useAppDispatch()

  console.log(todos)

  useEffect(() => {
    getTodos(sharingId, currentUser?._id, todoDate)
  }, [sharingId, currentUser?._id, todoDate])

  const getTodos = async (
    sharingId: string,
    userId?: string,
    todoDate?: string
  ) => {
    dispatch(setLoading(true))
    if (sharingId) {
      dispatch(getSharingTodosAsync(sharingId))
    } else {
      if (userId) {
        const payload = {
          userId: userId ?? '',
          date: todoDate ?? ''
        }
        dispatch(getTodosAsync(payload))
      }
    }
  }

  const handleChangeTodoDate = (date: any) => {
    history.push(`/app/todo?date=${getDate(date, true)}`)
  }

  const handleClearTodos = async () => {
    try {
      const payload: GetTodoPayload = {
        userId: currentUser?._id ?? '',
        date: todoDate
      }
      const result = await dispatch(clearTodosAsync(payload)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Đã xóa hết todo!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const handleShareTodo = async () => {
    try {
      const payload: GetTodoPayload = {
        userId: currentUser?._id ?? '',
        date: todoDate ?? ''
      }
      dispatch(shareTodosAsync(payload))
      dispatch(openSharingModal())
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const renderTodoHeader = () => {
    if (sharingView) {
      return <TodoSharingHeader />
    } else {
      return (
        <div className={classes.navigator}>
          <Typography variant='subtitle1'>Danh sách todo</Typography>
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
              variant='outlined'
              color='secondary'
              className={classes.copyBtn}
              startIcon={<ShareOutlinedIcon />}
              disabled={todos.length === 0}
              onClick={handleShareTodo}
            >
              Share
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              className={classes.copyBtn}
              startIcon={<FileCopyOutlinedIcon />}
              disabled={todos.length === 0}
              onClick={() => dispatch(openCopyModal())}
            >
              Copy
            </Button>
            <Button
              variant='outlined'
              color='primary'
              className={classes.copyBtn}
              startIcon={<ClearIcon />}
              disabled={todos.length === 0}
              onClick={() => dispatch(openClearTodoConfirmModal())}
            >
              Clear
            </Button>
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
      )
    }
  }

  const renderTodoItem = () => {
    if (loading) return null
    return todos && todos.length > 0 ? (
      todos.map((todo: TodoProps, index: number) => (
        <TodoItem index={index} data={todo} sharingView={sharingView} />
      ))
    ) : (
      <NoItemPage text='Chưa có todo nào!' />
    )
  }

  return (
    <Container maxWidth='md' className={classes.todoContainer}>
      <Grid>
        {renderTodoHeader()}
        <Grid container spacing={2} className={classes.todoList}>
          {renderTodoItem()}
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
      {isOpenCopyModal && (
        <CopyModal
          date={todoDate}
          open={isOpenCopyModal}
          close={() => dispatch(closeCopyModal())}
          currentUser={currentUser}
        />
      )}
      {isOpenClearTodoConfirmModal && (
        <ClearTodoConfirmModal
          date={todoDate}
          open={isOpenClearTodoConfirmModal}
          close={() => dispatch(closeClearTodoConfirmModal())}
          onSubmit={handleClearTodos}
        />
      )}
      {isOpenSharingModal && (
        <SharingModal
          open={isOpenSharingModal}
          close={() => dispatch(closeSharingModal())}
        />
      )}
    </Container>
  )
}

export default withContainer(Todo)
