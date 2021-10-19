import clsx from 'clsx'
import {
  Box,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Link,
  makeStyles,
  OutlinedInput,
  TextField,
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
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '25ch'
  },
  signInBtn: {
    //marginTop: '5%'
  },
  welcomeText: {
    fontWeight: 900
  },
  inputLabel: {
    fontWeight: theme.typography.fontWeightMedium
  },
  form: {
    marginTop: '20%'
  }
}))

const Login = () => {
  const classes = useStyles()
  return (
    <AuthLayout>
      <FormControl className={classes.formControl} variant='outlined'>
        <Typography
          variant='h6'
          component='label'
          className={classes.inputLabel}
        >
          Tên người dùng
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
      </FormControl>
    </AuthLayout>
  )
}

export default Login
