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
import ProjectItem from '../../common/components/projects/projectItem'

const validationProjectSchema = yup.object({
  projectName: yup
    .string()
    .min(6, 'Tối thiểu 6 kí tự')
    .required('Vui lòng nhập tên dự án'),
  startDate: yup.date().required('Vui lòng nhập ngày bắt đầu')
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
      projectName: '',
      startDate: new Date()
    },
    validationSchema: validationProjectSchema,
    onSubmit: (values) => {
      const payload: ProjectProps = {
        name: values.projectName,
        startDate: values.startDate
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
      <Grid container spacing={3}>
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
            id='projectName'
            name='projectName'
            label='Tên dự án'
            value={formik.values.projectName}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.projectName)}
            helperText={formik.errors.projectName}
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
        </form>
      </Modal>
    </div>
  )
}
export default Project
