import React, { FC, useState } from 'react'
import {
  Grid,
  makeStyles,
  Theme,
  withStyles,
  Typography,
  Card,
  CardContent,
  MenuItem,
  IconButton,
  ListItemIcon,
  Menu
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { green, grey, red } from '@material-ui/core/colors'
import { useAppDispatch } from '../../../app/hooks'
import {
  completeBucketAsync,
  deleteBucketAsync,
  getBucketAsync,
  openBucketModal
} from '../bucketSlice'
import { FlashType } from '../../../enums'
import { flashAlert } from '../../../app/appSlice'

const useStyles = makeStyles((theme: Theme) => ({
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
    justifyContent: 'center'
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
    fontWeight: theme.typography.fontWeightBold
  },
  todoDescr: {
    fontWeight: theme.typography.fontWeightBold
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
    color: 'rgb(34, 51, 84)'
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
  },
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  }
}))

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)

const CardContentStyled = withStyles({
  root: {
    padding: '0',
    '&:last-child': {
      paddingBottom: '0'
    }
  }
})(CardContent)

export interface BucketItemProps {
  index: number
  data: any
}

const BucketItem: FC<BucketItemProps> = ({ index, data }) => {
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

  const handleCompleteBucket = async (id: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(completeBucketAsync(id)).unwrap()
      if (result) {
        dispatch(
          flashAlert({
            message: 'Đã đánh dầu hoàn thành!',
            type: FlashType.Success
          })
        )
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  const handleEditBucket = async (id: string) => {
    handleCloseMorePopup()
    const result = await dispatch(getBucketAsync(id)).unwrap()
    if (result) {
      dispatch(openBucketModal({ isAddNew: false }))
    }
  }

  const handleDeleteBucket = async (id: string) => {
    handleCloseMorePopup()
    try {
      const result = await dispatch(deleteBucketAsync(id)).unwrap()
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
          <Grid md={1} className={classes.todoNumberGrid}>
            <span className={classes.todoNumber}>{index + 1}</span>
          </Grid>
          <Grid md={10} xs={10} className={classes.todoContent}>
            {data.description}
          </Grid>
          <Grid md={1} className={classes.actions}>
            <IconButton aria-label='more' onClick={handleClickMoreButton}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMorePopup}
            >
              <MenuItem onClick={() => handleCompleteBucket(data._id)}>
                <ListItemIconStyled>
                  <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </ListItemIconStyled>
                <Typography>Hoàn thành</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleEditBucket(data._id)}>
                <ListItemIconStyled>
                  <EditIcon style={{ color: grey[500] }} />
                </ListItemIconStyled>
                <Typography>Chỉnh sửa</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleDeleteBucket(data._id)}>
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

export default BucketItem
