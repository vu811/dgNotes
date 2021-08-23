import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { deleteProjectAsync, ProjectProps } from '../projectSlice'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { FlashType } from '../../../enums'
import { flashAlert } from '../../../app/appSlice'
import { Chip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
  avatar: {
    backgroundColor: red[500]
  },
  projectName: {
    fontWeight: theme.typography.fontWeightBold
  },
  cardAction: {
    justifyContent: 'space-between'
  },
  cardHeader: {
    cursor: 'pointer'
  },
  startDate: {
    //color: 'rgb(244, 67, 54)',
    //backgroundColor: 'rgba(244, 67, 54, 0.1)',
    backgroundColor: theme.palette.info.light,
    fontWeight: 700,
    padding: '4px',
    borderRadius: '3px'
  }
}))

const IconButtonStyled = withStyles({
  root: {
    padding: '5px'
  }
})(IconButton)

export interface ProjectItemProps {
  item: ProjectProps
}

const ProjectItem: FC<ProjectItemProps> = ({ item }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const goToDetail = (id?: any) => {
    history.push(`projects/${id}`)
  }

  const handleDeleteProject = async (id?: String) => {
    try {
      const result = await dispatch(deleteProjectAsync(id)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  return (
    <Grid item md={4} xs={12}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Typography
              variant='h5'
              component='h2'
              className={classes.projectName}
              onClick={() => goToDetail(item._id)}
            >
              {item.name}
            </Typography>
          }
          subheader={
            <Chip label='In progress' size='small' color='secondary' />
          }
          className={classes.cardHeader}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <span className={classes.startDate}> Start date: 12/12/2021</span>
          <div>
            <IconButtonStyled
              color='secondary'
              onClick={() => handleDeleteProject(item._id)}
            >
              <EditIcon />
            </IconButtonStyled>
            <IconButtonStyled
              color='primary'
              onClick={() => handleDeleteProject(item._id)}
            >
              <DeleteForeverIcon />
            </IconButtonStyled>
          </div>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProjectItem
