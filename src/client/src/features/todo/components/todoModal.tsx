import 'date-fns'
import { makeStyles, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import { useAppDispatch } from '../../../app/hooks'
import { getDate, getTime } from '../../../utils/dateTimeHelper'
import { addTodoAsync, TodoProps } from '../todoSlice'

const validationSchema = yup.object({
  startTime: yup.date(),
  endTime: yup.date(),
  description: yup
    .string()
    .required('Vui lòng nhập ngày bắt đầu')
    .max(100, 'Tối đa 100 kí tự')
})

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
  projectWrapper: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 202px)',
      overflowY: 'auto'
    }
  }
}))

const TodoModal = ({ date, open, close }: any) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      time: null,
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: TodoProps = {
        date: getDate(date),
        time: getTime(values.time ?? undefined),
        description: values.description
      }
      const saved = await dispatch(addTodoAsync(payload)).unwrap()
      if (saved) resetForm()
    }
  })
  return (
    <Modal open={open} onClose={close} onSubmit={formik.handleSubmit}>
      <form noValidate autoComplete='off'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            id='time'
            name='time'
            label='Thời gian'
            mask='__:__ _M'
            value={formik.values.time}
            onChange={(val) => {
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
  )
}

export default TodoModal
