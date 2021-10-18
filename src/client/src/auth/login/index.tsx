import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@material-ui/core'
import AuthLayout from '../../layouts/auth'

const Login = () => {
  return (
    <AuthLayout>
      <form>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          name='email'
          autoComplete='email'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Sign In
        </Button>
      </form>
    </AuthLayout>
  )
}

export default Login
