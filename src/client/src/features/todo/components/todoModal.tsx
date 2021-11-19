import 'date-fns'
import { FC } from 'react'
import { TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { getDate, getTime } from '../../../utils/dateTimeHelper'
import { addTodoAsync, TodoProps, updateTodoAsync } from '../todoSlice'
import { CurrentUserProps } from '../../../auth/authSlice'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

const validationSchema = yup.object({
  startTime: yup.date(),
  endTime: yup.date(),
  description: yup
    .string()
    .required('Vui lòng nhập ngày bắt đầu')
    .max(100, 'Tối đa 100 kí tự')
})

interface TodoModalProps extends CurrentUserProps {
  date: string
  open: boolean
  close: () => void
}

const TodoModal: FC<TodoModalProps> = ({ date, open, close, currentUser }) => {
  const todo = useAppSelector((state) => state.todo.todo)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: todo
      ? {
          time: new Date(`${todo.date} ${todo.time}`),
          description: todo.description
        }
      : {
          time: null,
          description: ''
        },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: TodoProps = {
        _id: todo ? todo._id : '',
        userId: currentUser?._id,
        date: getDate(new Date(date), true),
        time: getTime(values.time?.toISOString() ?? ''),
        description: values.description
      }
      const saved = todo
        ? await dispatch(updateTodoAsync(payload)).unwrap()
        : await dispatch(addTodoAsync(payload)).unwrap()
      if (saved) {
        dispatch(
          flashAlert({
            message: todo ? 'Cập nhật thành công' : 'Thêm thành công',
            type: FlashType.Success
          })
        )
        resetForm()
      }
    }
  })
  return (
    <Modal
      title={`${todo ? 'Chỉnh sửa' : 'Thêm'} todo`}
      open={open}
      onClose={close}
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
