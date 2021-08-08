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
import { ProjectProps } from '../../projectSlice'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ShareIcon from '@material-ui/icons/Share'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

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
        />
        <CardContent>
          <Typography variant='body2' color='textSecondary' component='p'>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <IconButton aria-label='delete'>
            <DeleteForeverIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ProjectItem
