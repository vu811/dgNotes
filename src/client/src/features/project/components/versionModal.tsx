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
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addVersionAsync,
  updateVersionAsync,
  VersionPayload
} from '../projectSlice'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

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
  const version = useAppSelector((state) => state.project.version)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: version
      ? {
          name: version.name,
          startDate: version.startDate,
          description: version.description
        }
      : {
          name: '',
          startDate: null,
          description: ''
        },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { name, description, startDate } = values
        const payload: VersionPayload = {
          id,
          version: {
            _id: version ? version._id : '',
            name,
            description,
            startDate
          }
        }
        const result = version
          ? await dispatch(updateVersionAsync(payload))
          : await dispatch(addVersionAsync(payload))
        if (result) {
          dispatch(
            flashAlert({
              message: 'Cập nhật thành công!',
              type: FlashType.Success
            })
          )
          resetForm()
        }
      } catch (err) {
        dispatch(flashAlert({ message: err, type: FlashType.Error }))
      }
    }
  })
  return (
    <Modal
      title='Thêm phiên bản'
      open={open}
      onClose={close}
      onSubmit={formik.handleSubmit}
    >
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
