import 'date-fns'
import { FC, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  closeProjectModal,
  getProjectsAsync,
  openProjectModal,
  ProjectProps,
  selectProjects
} from './projectSlice'
import ProjectItem from './components/projectItem'
import { Typography } from '@material-ui/core'
import NoItemPage from '../../common/components/noItemPage'
import ProjectModal from './components/projectModal'
import { withContainer } from '../../layouts/container'
import { CurrentUserProps } from '../../auth/authSlice'

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
    },
    navigator: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '10px'
    }
  })
)

interface ProjectTypeProps extends CurrentUserProps {}

const Project: FC<ProjectTypeProps> = ({ currentUser }) => {
  const classes = useStyles()
  const projects = useAppSelector(selectProjects)
  const isOpenProjectModal = useAppSelector(
    (state) => state.project.isOpenProjectModal
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getProjectsAsync(currentUser?._id))
    }
  }, [currentUser?._id])

  return (
    <div className={classes.root}>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'>Quản lí dự án</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
            className={classes.newProjectBtn}
            onClick={() => dispatch(openProjectModal({ isAddNew: true }))}
          >
            thêm
          </Button>
        </div>
      </div>
      <Grid container spacing={2} className={classes.projectWrapper}>
        {projects && projects.length > 0 ? (
          projects.map((project: ProjectProps) => (
            <ProjectItem item={project} />
          ))
        ) : (
          <NoItemPage text='Chưa có dự án nào!' />
        )}
      </Grid>
      {isOpenProjectModal && (
        <ProjectModal
          open={isOpenProjectModal}
          close={() => dispatch(closeProjectModal())}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}
export default withContainer(Project)
