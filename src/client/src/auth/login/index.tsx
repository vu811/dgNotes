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
import { loginAsync } from '../authSlice'
import { useHistory, useLocation } from 'react-router'
import { FlashType } from '../../enums'
import { flashAlert } from '../../app/appSlice'

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
  }
}))

const validationProjectSchema = yup.object({
  email: yup
    .string()
    .email('Địa chỉ email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: yup.string().required('Vui lòng nhập mật khẩu')
})

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const { from }: any = location.state || { from: { pathname: '/' } }
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationProjectSchema,
    onSubmit: async (values) => {
      try {
        const result = await dispatch(loginAsync(values)).unwrap()
        if (result.success) {
          history.replace(from)
        } else {
          dispatch(flashAlert({ message: result.error, type: FlashType.Error }))
        }
      } catch (error) {}
    }
  })
  return (
    <AuthLayout>
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
        onClick={() => formik.handleSubmit()}
      >
        Đăng nhập
      </Button>
    </AuthLayout>
  )
}

export default Login
