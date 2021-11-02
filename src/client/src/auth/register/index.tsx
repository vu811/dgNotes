import {
  Button,
  FormHelperText,
  makeStyles,
  OutlinedInput,
  Typography
} from '@material-ui/core'
import * as yup from 'yup'
import { useFormik } from 'formik'
import AuthLayout from '../../layouts/auth'
import { useAppDispatch } from '../../app/hooks'
import { registerAsync } from '../authSlice'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '1%'
  },
  formControl: {
    width: '100%',
    marginBottom: '5%'
  },
  inputLabel: {
    fontWeight: theme.typography.fontWeightMedium
  },
  form: {
    marginTop: '20%'
  }
}))

const validationProjectSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên của bạn'),
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: yup
    .string()
    .min(6, 'Mật khẩu ít nhất 6 kí tự')
    .max(12, 'Mật khẩu tối đa 12 kí tự')
    .required('Vui lòng nhập mật khẩu')
})

const Register = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: validationProjectSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(registerAsync(values)).unwrap()
        if (result) {
          history.push('/auth/login')
        }
      } catch (error) {}
    }
  })
  return (
    <AuthLayout>
      {/* I dont know why CSS does not work =)). Check later */}
      {/* <FormControl className={classes.formControl} variant='outlined'>
        <Typography
          variant='h6'
          component='label'
          className={classes.inputLabel}
        >
          Tên
        </Typography>
        <OutlinedInput id='username' type='text' fullWidth color='secondary' />
      </FormControl>
      <FormControl className={classes.formControl} variant='outlined'>
        <Typography
          variant='h6'
          component='label'
          className={classes.inputLabel}
        >
          Tên tài khoản
        </Typography>
        <OutlinedInput id='username' type='text' fullWidth color='secondary' />
      </FormControl>
      <FormControl className={classes.formControl} variant='outlined'>
        <Typography
          variant='h6'
          component='label'
          className={classes.inputLabel}
        >
          Mật khẩu
        </Typography>
        <OutlinedInput
          id='password'
          type='password'
          fullWidth
          color='secondary'
        />
      </FormControl> */}
      <div className={classes.formControl}>
        <Typography
          variant='subtitle2'
          component='label'
          className={classes.inputLabel}
        >
          Tên
        </Typography>
        <OutlinedInput
          id='name'
          type='text'
          fullWidth
          color='secondary'
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.name)}
        />
        <FormHelperText id='name-error' error>
          {formik.errors.name}
        </FormHelperText>
      </div>
      <div className={classes.formControl}>
        <Typography
          variant='subtitle2'
          component='label'
          className={classes.inputLabel}
        >
          Email
        </Typography>
        <OutlinedInput
          id='email'
          type='text'
          fullWidth
          color='secondary'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.email)}
        />
        <FormHelperText id='email-error' error>
          {formik.errors.email}
        </FormHelperText>
      </div>
      <div className={classes.formControl}>
        <Typography
          variant='subtitle2'
          component='label'
          className={classes.inputLabel}
        >
          Mật khẩu
        </Typography>
        <OutlinedInput
          id='password'
          type='password'
          fullWidth
          color='secondary'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.password)}
        />
        <FormHelperText id='password-error' error>
          {formik.errors.password}
        </FormHelperText>
      </div>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        size='large'
        disabled={!formik.isValid}
        onClick={() => formik.handleSubmit()}
      >
        Đăng ký
      </Button>
    </AuthLayout>
  )
}

export default Register
