import { FC, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Menu,
  MenuItem,
  Theme,
  withStyles
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { green, grey, red } from '@material-ui/core/colors'
import { ListItemIcon } from '@material-ui/core'

const useStyles = makeStyles<Theme>((theme) => ({
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
  deleteTodo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  cardContent: {
    color: 'rgb(34, 51, 84)',
    backgroundColor: 'white'
  },
  test: {
    padding: 0
  }
}))

const CardContentStyled = withStyles({
  root: {
    padding: '10px',
    '&:last-child': {
      paddingBottom: '10px'
    }
  }
})(CardContent)

const IconButtonStyled = withStyles((theme) => ({
  root: {
    padding: '2px',
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
}))(IconButton)

const ListItemIconStyled = withStyles((theme) => ({
  root: {
    minWidth: '30px'
  }
}))(ListItemIcon)

export interface ObjectiveItemProps {
  index: number
}

export interface StyleProps {
  isCompleted?: boolean
}

const ObjectiveItem: FC<ObjectiveItemProps> = ({ index }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <Card className={classes.root}>
      <CardContentStyled className={classes.cardContent}>
        <Grid container>
          <Grid md={1} className={classes.todoNumberGrid}>
            <span className={classes.todoNumber}>{index + 1}</span>
          </Grid>
          <Grid md={10} xs={8} className={classes.todoContent}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
          </Grid>
          <Grid md={1} className={classes.deleteTodo}>
            <IconButton aria-label='settings' onClick={() => {}}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              className={classes.test}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {}}>
                <ListItemIconStyled>
                  <CheckCircleOutlineIcon style={{ color: green[500] }} />
                </ListItemIconStyled>
                <Typography>fgfgfg</Typography>
              </MenuItem>
              <MenuItem>
                <ListItemIconStyled>
                  <EditIcon style={{ color: grey[500] }} />
                </ListItemIconStyled>
                <Typography>Chỉnh sửa</Typography>
              </MenuItem>
              <MenuItem onClick={() => {}}>
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
