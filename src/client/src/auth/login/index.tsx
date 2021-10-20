import {
  Button,
  makeStyles,
  OutlinedInput,
  Typography
} from '@material-ui/core'
import AuthLayout from '../../layouts/auth'

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

const Login = () => {
  const classes = useStyles()
  return (
    <AuthLayout onSubmit={() => {}}>
      <div className={classes.formControl}>
        <Typography
          variant='subtitle2'
          component='label'
          className={classes.inputLabel}
        >
          Email
        </Typography>
        <OutlinedInput id='username' type='text' fullWidth color='secondary' />
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
        />
      </div>
      <Button
        type='submit'
        fullWidth
        variant='contained'
        color='primary'
        size='large'
      >
        Đăng nhập
      </Button>
    </AuthLayout>
  )
}

export default Login
