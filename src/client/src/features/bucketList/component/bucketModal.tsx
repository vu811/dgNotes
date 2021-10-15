import { makeStyles, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  addBucketAsync,
  BucketResProps,
  updateBucketAsync
} from '../bucketSlice'

const validationSchema = yup.object({
  description: yup
    .string()
    .required('Vui lòng nhập mô tả')
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

const BucketModal = ({ open, close }: any) => {
  const bucket = useAppSelector((state) => state.bucket.bucket)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: bucket
      ? {
          description: bucket.description
        }
      : {
          description: ''
        },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const payload: BucketResProps = {
        _id: bucket ? bucket._id : '',
        description: values.description
      }
      const saved = bucket
        ? await dispatch(updateBucketAsync(payload)).unwrap()
        : await dispatch(addBucketAsync(payload)).unwrap()
      if (saved) resetForm()
    }
  })
  return (
    <Modal
      title={`${bucket ? 'Chỉnh sửa' : 'Thêm'} bucket`}
      open={open}
      onClose={close}
      onSubmit={formik.handleSubmit}
    >
      <form noValidate autoComplete='off'>
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

export default BucketModal
