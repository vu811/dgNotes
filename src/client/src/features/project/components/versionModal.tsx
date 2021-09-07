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
import { addVersionAsync } from '../projectSlice'

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Tối thiểu 3 kí tự')
    .required('Vui lòng nhập version'),
  //startDate: yup.date(),
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

const VersionModal = ({ id, open, close }: any) => {
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: null,
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload = {
        id,
        version: values
      }
      dispatch(addVersionAsync(payload))
      resetForm()
    }
  })
  return (
    <Modal open={open} onClose={close} onSubmit={formik.handleSubmit}>
      <form noValidate autoComplete='off'>
        <TextField
          id='name'
          name='name'
          label='Phiên bản'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
          helperText={formik.errors.name}
          placeholder='Phiên bản'
          fullWidth
          color='secondary'
          margin='normal'
          InputLabelProps={{
            shrink: true
          }}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='startDate'
            name='startDate'
            label='Ngày bắt đầu'
            value={formik.values.startDate}
            color='secondary'
            format='dd/MM/yyyy'
            onChange={(val) => {
              formik.setFieldValue('startDate', val)
            }}
            minDate={new Date()}
          />
        </MuiPickersUtilsProvider>
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
      </form>
    </Modal>
  )
}

export default VersionModal
