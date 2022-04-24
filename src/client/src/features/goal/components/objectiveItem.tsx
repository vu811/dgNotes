import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { MenuItem, Theme, Tooltip, withStyles } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import BeenhereIcon from '@material-ui/icons/Beenhere'
import { green, grey, red } from '@material-ui/core/colors'
import { ListItemIcon, IconButton, Menu } from '@material-ui/core'
import {
  completeGoalAsync,
  deleteGoalAsync,
  getGoalAsync,
  GoalResProps,
  openGoalModal
} from '../goalSlice'
import { useAppDispatch } from '../../../app/hooks'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: '0.5em'
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
    boderCheckBox: {
      borderRight: `solid 2px ${theme.palette.primary.main}`
    },
    todoContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: theme.typography.fontWeightMedium as number
    },
    todoNumber: {
      display: 'inline-block',
      color: theme.palette.primary.main,
      backgroundColor: 'rgba(255, 25, 67, 0.1)',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoDescr: {
      fontWeight: theme.typography.fontWeightBold as number
    },
    todoNumberGrid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    actions: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main,
      cursor: 'pointer'
    },
    cardContent: {
      color: 'rgb(34, 51, 84)',
      backgroundColor: '#f5f8fc'
    },
    cardContentCompleted: {
      color: 'rgb(34, 51, 84)',
      backgroundColor: 'rgb(201, 248, 222)'
    },
    test: {
      padding: 0
    },
    planVerified: {
      cursor: 'poiter'
    }
  })
)

const CardContentStyled = withStyles({
  root: {
    padding: '10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
})(CardContent)

const ListItemIconStyled = withStyles(() => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)

export interface ObjectiveItemProps {
  index: number
  data: GoalResProps
}

const ObjectiveItem: FC<ObjectiveItemProps> = ({ index, data }) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMoreButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleDeleteGoal = async (id: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(deleteGoalAsync(id)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const handleEditGoal = async (id: string) => {
    handleCloseMorePopup()
    const result = await dispatch(getGoalAsync(id)).unwrap()
    if (result) {
      dispatch(openGoalModal({ isAddNew: false }))
    }
  }

  const handleCompleteGoal = async (id: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(completeGoalAsync(id)).unwrap()
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
    <Card className={classes.root}>
      <CardContentStyled
        className={
          data.completedDate
            ? classes.cardContentCompleted
            : classes.cardContent
        }
      >
        <Grid container>
          <Grid item md={2} className={classes.todoNumberGrid}>
            <Tooltip
              arrow
              placement='top-start'
              title={
                data.plan
                  ? `Kế hoạch: ${data.plan}`
                  : 'Mục tiêu không có kế hoạch thì chỉ là một ước mơ!'
              }
            >
              <BeenhereIcon
                fontSize='inherit'
                style={{
                  color: data.plan
                    ? 'rgb(102, 187, 106)'
                    : 'rgba(0, 0, 0, 0.54)'
                }}
              />
            </Tooltip>
            <span className={classes.todoNumber}>{index + 1}</span>
          </Grid>
          <Grid item md={9} xs={8} className={classes.todoContent}>
            {data.goal}
          </Grid>
          <Grid item md={1} className={classes.actions}>
            {/* <MoreButton key={data._id}>
              <MenuItem onClick={() => {}}>
                <ListItemIconStyled>
                  <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </ListItemIconStyled>
                <Typography>Hoàn thành</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleEditGoal(data._id)}>
                <ListItemIconStyled>
                  <EditIcon style={{ color: grey[500] }} />
                </ListItemIconStyled>
                <Typography>Chỉnh sửa</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleDeleteGoal(data._id)}>
                <ListItemIconStyled>
                  <DeleteForeverIcon style={{ color: red[500] }} />
                </ListItemIconStyled>
                <Typography>Xóa</Typography>
              </MenuItem>
            </MoreButton> */}
            <IconButton aria-label='more' onClick={handleClickMoreButton}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMorePopup}
            >
              <MenuItem onClick={() => handleCompleteGoal(data._id)}>
                <ListItemIconStyled>
                  <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </ListItemIconStyled>
                <Typography>Hoàn thành</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleEditGoal(data._id)}>
                <ListItemIconStyled>
                  <EditIcon style={{ color: grey[500] }} />
                </ListItemIconStyled>
                <Typography>Chỉnh sửa</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleDeleteGoal(data._id)}>
                <ListItemIconStyled>
                  <DeleteForeverIcon style={{ color: red[500] }} />
                </ListItemIconStyled>
                <Typography>Xóa</Typography>
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </CardContentStyled>
    </Card>
  )
}

export default ObjectiveItem
