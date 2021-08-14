import 'date-fns'
import { useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Modal from '../../common/components/modal'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import TextField from '@material-ui/core/TextField'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  addProjectAsync,
  closeProjectModal,
  getProjectsAsync,
  openProjectModal,
  ProjectProps,
  selectProjects
} from './projectSlice'
import ProjectItem from './components/projectItem'

const validationProjectSchema = yup.object({
  name: yup.string().required('Vui lòng nhập tên dự án'),
  startDate: yup.date().required('Vui lòng nhập ngày bắt đầu'),
  description: yup.string().max(500, 'Tối đa 500 kí tự')
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
    },
    projectWrapper: {
      [theme.breakpoints.up('md')]: {
        maxHeight: 'calc(100vh - 202px)',
        overflowY: 'auto'
      }
    }
  })
)

const Project = () => {
  const classes = useStyles()
  const projects = useAppSelector(selectProjects)
  const isOpenProjectModal = useAppSelector(
    (state) => state.project.isOpenProjectModal
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProjectsAsync())
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      startDate: new Date(),
      description: ''
    },
    validationSchema: validationProjectSchema,
    onSubmit: (values) => {
      const payload: ProjectProps = {
        name: values.name,
        startDate: values.startDate,
        description: values.description
      }
      dispatch(addProjectAsync(payload))
    }
  })

  return (
    <div className={classes.root}>
      <Button
        variant='contained'
        color='secondary'
        startIcon={<AddCircleOutlineIcon />}
        className={classes.newProjectBtn}
        onClick={() => dispatch(openProjectModal())}
      >
        thêm dự án
      </Button>
      <Grid container spacing={3} className={classes.projectWrapper}>
        {projects &&
          projects.map((project: ProjectProps) => (
            <ProjectItem item={project} />
          ))}
      </Grid>
      <Modal
        open={isOpenProjectModal}
        onClose={() => dispatch(closeProjectModal())}
        onSubmit={formik.handleSubmit}
      >
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id='name'
            name='name'
            label='Tên dự án'
            value={formik.values.name}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
            placeholder='Tên dự án'
            fullWidth
            color='secondary'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              id='startDate'
              name='startDate'
              label='Ngày bắt đầu'
              value={formik.values.startDate}
              color='secondary'
              margin='normal'
              format='dd/MM/yyyy'
              onChange={(val) => {
                formik.setFieldValue('startDate', val)
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id='description'
            name='description'
            label='Mô tả'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.description)}
            helperText={formik.errors.description}
            placeholder='Mô tả dự án'
            fullWidth
            multiline
            rows={4}
            color='secondary'
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
      </Modal>
    </div>
  )
}
export default Project
