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
  useTheme
} from '@material-ui/core'
import React, { FC } from 'react'
import cover from '../../assets/images/cover.svg'

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
  }
}))

const AuthLayout: FC = ({ children }) => {
  const classes = useStyles()
  const theme = useTheme()
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
          <div>{children}</div>
        </Card>
      </div>
    </>
  )
}

export default AuthLayout
