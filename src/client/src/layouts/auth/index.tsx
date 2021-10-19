import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme,
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Link,
  OutlinedInput,
  TextField
} from '@material-ui/core'
import { GifRounded } from '@material-ui/icons'
import React, { FC } from 'react'
import cover from '../../assets/images/cover.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  card: {
    display: 'flex',
    flexDirection: 'row'
  },
  authForm: {},
  content: {
    display: 'flex',
    flexDirection: 'column'
  },
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

const AuthLayout: FC = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            component='img'
            style={{ width: '90vh', height: '70vh' }}
            image={cover}
            alt='Live from space album cover'
          />
          <Box className={classes.wrapper}>
            <Typography
              variant='h5'
              component='h3'
              className={classes.welcomeText}
            >
              Chào mừng bạn đến với dgNOTES!
            </Typography>
            <Typography variant='body2' component='span' color='textSecondary'>
              {'Bạn chưa có tài khoản? '}
            </Typography>
            <Typography component='span'>
              <Link href='/goal' onClick={() => {}}>
                Đăng ký
              </Link>
            </Typography>
            <div className={classes.form}>{children}</div>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.signInBtn}
              size='large'
            >
              Đăng nhập
            </Button>
          </Box>
        </Card>
      </div>
    </>
  )
}

export default AuthLayout
