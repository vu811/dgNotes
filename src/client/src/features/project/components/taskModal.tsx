import 'date-fns'
import { TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addTaskAsync,
  closeTaskModal,
  updateTaskAsync,
  UpdateTaskPayload
} from '../projectSlice'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

const validationSchema = yup.object({
  description: yup
    .string()
    .required('Vui lòng nhập Mô tả')
    .max(500, 'Tối đa 500 kí tự'),
  dueDate: yup.string().nullable().required('Vui lòng nhập Ngày đến hạn')
})

const TaskModal = ({ projectId, versionId, open, close }: any) => {
  const task = useAppSelector((state) => state.project.task)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: task
      ? {
          description: task.description,
          dueDate: task.dueDate
        }
      : {
          description: '',
          dueDate: null
        },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (task) {
          const { description, dueDate } = values
          const payload: UpdateTaskPayload = {
            projectId: projectId,
            versionId: versionId,
            taskId: task._id,
            description,
            dueDate: dueDate ?? undefined
          }
          const result = await dispatch(updateTaskAsync(payload)).unwrap()
          if (result) {
            dispatch(closeTaskModal())
            dispatch(
              flashAlert({
                message: 'Cập nhật thành công!',
                type: FlashType.Success
              })
            )
          }
        } else {
          const payload = {
            projectId,
            versionId,
            task: values
          }
          const result = await dispatch(addTaskAsync(payload)).unwrap()
          if (result) {
            dispatch(
              flashAlert({
                message: 'Thêm công việc thành công!',
                type: FlashType.Success
              })
            )
          }
        }
        resetForm()
      } catch (err) {
        dispatch(flashAlert({ message: err, type: FlashType.Error }))
      }
    }
  })
  return (
    <Modal
      title={`${task ? 'Chỉnh sửa' : 'Thêm'} công việc`}
      open={open}
      onClose={close}
      onSubmit={formik.handleSubmit}
    >
      <form noValidate autoComplete='off'>
        <TextField
          id='description'
          name='description'
          label='Mô tả'
          value={formik.values.description}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.description)}
          helperText={formik.errors.description}
          placeholder='Mô tả'
          fullWidth
          multiline
          rows={4}
          color='secondary'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='dueDate'
            name='dueDate'
            label='Ngày đến hạn'
            value={formik.values.dueDate}
            color='secondary'
            format='dd/MM/yyyy'
            onChange={(val) => {
              formik.setFieldValue('dueDate', val)
            }}
            error={Boolean(formik.errors.dueDate)}
            helperText={formik.errors.dueDate}
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
      </form>
    </Modal>
  )
}

export default TaskModal
