import 'date-fns'
import React, { useState } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Modal from '../../common/components/modal'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import * as yup from 'yup'
import { useFormik } from 'formik'

const validationProjectSchema = yup.object({
  projectName: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Vui lòng nhập tên dự án')
  //startDate: yup.date().required('Vui lòng nhập ngày bắt đầu')
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    }
  })
)

const Project = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>
  const [open, setOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2014-08-18T21:11:54'))

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
  }

  const formik = useFormik({
    initialValues: {
      projectName: 'Vũ lồn'
      //startDate: new Date()
    },
    validationSchema: validationProjectSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    }
  })

  return (
    <div className={classes.root}>
      <Button variant='contained' color='secondary' startIcon={<AddCircleOutlineIcon />} className={classes.newProjectBtn} onClick={() => setOpen(true)}>
        thêm dự án
      </Button>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant='h5' component='h2'>
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                adjective
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant='h5' component='h2'>
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                adjective
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant='h5' component='h2'>
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                adjective
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary' gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant='h5' component='h2'>
                be{bull}nev{bull}o{bull}lent
              </Typography>
              <Typography className={classes.pos} color='textSecondary'>
                adjective
              </Typography>
              <Typography variant='body2' component='p'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className={classes.root} noValidate autoComplete='off' onSubmit={formik.handleSubmit}>
          <TextField
            id='projectName'
            name='projectName'
            label='Tên dự án'
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={formik.touched.projectName && Boolean(formik.errors.projectName)}
            helperText={formik.touched.projectName && formik.errors.projectName}
            placeholder='Tên dự án'
            fullWidth
            color='secondary'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
          />
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id='start-date'
              name='startDate'
              label='Ngày bắt đầu'
              value={formik.values.startDate}
              color='secondary'
              margin='normal'
              format='dd/MM/yyyy'
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider> */}
        </form>
      </Modal>
    </div>
  )
}
export default Project
