import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import { grey, red } from '@material-ui/core/colors'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  deleteProjectAsync,
  getProjectAsync,
  openProjectModal,
  ProjectProps
} from '../projectSlice'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../../app/hooks'
import { FlashType } from '../../../enums'
import { flashAlert } from '../../../app/appSlice'
import { ListItemIcon, Menu, MenuItem } from '@material-ui/core'
import { getDate } from '../../../utils/dateTimeHelper'
import WatchLaterTwoToneIcon from '@material-ui/icons/WatchLaterTwoTone'
import Filter1TwoToneIcon from '@material-ui/icons/Filter1TwoTone'
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone'
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone'

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
    cursor: 'pointer',
    padding: '16px 30px'
  },
  startDate: {
    color: theme.palette.text.primary,
    fontWeight: 700
  },
  propTitle: {
    color: theme.palette.text.primary,
    fontWeight: 700
  },
  propContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  propContentText: {
    marginLeft: '10px'
  }
}))

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)

const CardContentStyled = withStyles({
  root: {
    padding: '0 30px',
    '&:last-child': {
      paddingBottom: '16px'
    }
  }
})(CardContent)

export interface ProjectItemProps {
  item: ProjectProps
}

const ProjectItem: FC<ProjectItemProps> = ({ item }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useAppDispatch()

  const goToDetail = (id?: any) => {
    history.push(`project/${id}`)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMoreButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleEditProject = async (id: string) => {
    handleCloseMorePopup()
    const result = await dispatch(getProjectAsync(id)).unwrap()
    if (result) {
      dispatch(openProjectModal({ isAddNew: false }))
    }
  }

  const handleDeleteProject = async (id?: string) => {
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
    <Grid item md={12}>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label='more' onClick={handleClickMoreButton}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Grid container>
              <Grid item md={10}>
                <Typography
                  variant='h4'
                  component='div'
                  className={classes.projectName}
                  onClick={() => goToDetail(item._id)}
                >
                  {item.name}
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography
                  variant='subtitle1'
                  component='span'
                  className={classes.startDate}
                >
                  {'Ngày bắt đầu - '}
                </Typography>
                <Typography
                  variant='body2'
                  component='span'
                  color='textSecondary'
                >
                  {getDate(item.startDate)}
                </Typography>
              </Grid>
            </Grid>
          }
          subheader={
            <Typography variant='body2' color='textSecondary' component='p'>
              {item.description}
            </Typography>
          }
          className={classes.cardHeader}
        />
        <CardContentStyled>
          <Grid container>
            <Grid item md={3}>
              <Typography
                variant='subtitle2'
                component='div'
                className={classes.propTitle}
              >
                Trạng thái:
              </Typography>
              <div className={classes.propContent}>
                <WatchLaterTwoToneIcon />
                <span className={classes.propContentText}>đang thực hiện</span>
              </div>
            </Grid>
            <Grid item md={3}>
              <Typography
                variant='subtitle2'
                component='div'
                className={classes.propTitle}
              >
                Phiên bản hiện tại:
              </Typography>
              <div className={classes.propContent}>
                <Filter1TwoToneIcon color='secondary' />
                <span className={classes.propContentText}>1.0</span>
              </div>
            </Grid>
            <Grid item md={3}>
              <Typography
                variant='subtitle2'
                component='div'
                className={classes.propTitle}
              >
                Ngày release:
              </Typography>
              <div className={classes.propContent}>
                <DateRangeTwoToneIcon style={{ color: 'blueviolet' }} />
                <span className={classes.propContentText}>12/03/2021</span>
              </div>
            </Grid>
            <Grid item md={3}>
              <Typography
                variant='subtitle2'
                component='div'
                className={classes.propTitle}
              >
                Pending task:
              </Typography>
              <div className={classes.propContent}>
                <AssignmentTwoToneIcon style={{ color: 'orange' }} />
                <span className={classes.propContentText}>5/15</span>
              </div>
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMorePopup}
      >
        <MenuItem onClick={() => handleEditProject(item._id ?? '')}>
          <ListItemIconStyled>
            <EditIcon style={{ color: grey[500] }} />
          </ListItemIconStyled>
          <Typography>Chỉnh sửa</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteProject(item._id)}>
          <ListItemIconStyled>
            <DeleteForeverIcon style={{ color: red[500] }} />
          </ListItemIconStyled>
          <Typography>Xóa</Typography>
        </MenuItem>
      </Menu>
    </Grid>
  )
}

export default ProjectItem
