import 'date-fns'
import { makeStyles, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import { useAppDispatch } from '../../../app/hooks'
import { addTaskAsync, TaskPayload } from '../projectSlice'

const validationSchema = yup.object({
  description: yup.string().max(500, 'Tối đa 500 kí tự')
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

const TaskModal = ({ projectId, versionId, open, close }: any) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      description: '',
      dueDate: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log(values)
      const payload = {
        projectId,
        versionId,
        task: values
      }
      dispatch(addTaskAsync(payload))
      resetForm()
    }
  })
  return (
    <Modal open={open} onClose={close} onSubmit={formik.handleSubmit}>
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
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
      </form>
    </Modal>
  )
}

export default TaskModal
