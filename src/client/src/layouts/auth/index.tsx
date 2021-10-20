import {
  Box,
  Card,
  CardMedia,
  CssBaseline,
  makeStyles,
  Typography,
  Button
} from '@material-ui/core'
import { FC, ReactNode } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import cover from '../../assets/images/cover.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    flexDirection: 'column'
  },
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  wrapper: {
    padding: '2%',
    width: '420px'
  },
  formControl: {
    width: '100%'
  },
  welcomeText: {
    fontWeight: 900
  },
  form: {
    marginTop: '10%'
  },
  logoText: {
    color: theme.palette.primary.main,
    fontWeight: 900
  },
  authText: {
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  }
}))

interface AuthProps {
  onSubmit: () => void
  children: ReactNode
}

const AuthLayout: FC<AuthProps> = ({ onSubmit, children }) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  const isLoginPage = location.pathname === '/auth/login'

  const handleClickAuthLink = () => {
    history.push(isLoginPage ? '/auth/register' : '/auth/login')
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            component='img'
            style={{ width: '90vh', height: '70vh' }}
            image={cover}
            alt='auth cover image'
          />
          <Box className={classes.wrapper}>
            <Typography
              variant='h5'
              component='h3'
              className={classes.welcomeText}
            >
              {'Chào mừng bạn đến với '}
              <Typography
                variant='h5'
                component='span'
                className={classes.logoText}
              >
                dgNOTES
              </Typography>
            </Typography>

            <Typography variant='body2' component='span' color='textSecondary'>
              {isLoginPage
                ? 'Bạn chưa có tài khoản? '
                : 'Bạn đã có tài khoản? '}
            </Typography>
            <Typography
              variant='body2'
              component='span'
              className={classes.authText}
              onClick={handleClickAuthLink}
            >
              {isLoginPage ? 'Tạo một tài khoản' : 'Đăng nhập'}
            </Typography>
            <div className={classes.form}>{children}</div>
            {/* <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              size='large'
              onClick={onSubmit}
            >
              {isLoginPage ? 'Đăng nhập' : 'Đăng ký'}
            </Button> */}
          </Box>
        </Card>
      </div>
    </>
  )
}

export default AuthLayout
