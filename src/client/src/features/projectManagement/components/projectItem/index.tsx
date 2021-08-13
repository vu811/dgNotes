import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { deleteProjectAsync, ProjectProps } from '../../projectSlice'
import IconButton from '@material-ui/core/IconButton'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../../../app/hooks'
import { FlashType } from '../../../../enums'
import { flashAlert } from '../../../../app/appSlice'

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
    justifyContent: 'flex-end'
  }
}))

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
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              {item.name[0].toUpperCase()}
            </Avatar>
          }
          title={
            <Typography
              variant='h5'
              component='h2'
              className={classes.projectName}
            >
              {item.name}
            </Typography>
          }
          onClick={() => goToDetail(item._id)}
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <IconButton
            aria-label='delete'
            onClick={() => handleDeleteProject(item._id)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProjectItem
