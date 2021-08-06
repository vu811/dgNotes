import { FC } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import { red } from '@material-ui/core/colors'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { TodoResponse } from '../../todoSlice'
import { Checkbox, withStyles } from '@material-ui/core'
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
  boderCheckBox: {
    borderRight: `solid 2px ${theme.palette.primary.main}`
  },
  todoContent: {
    textAlign: 'center'
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
    fontWeight: 'bold'
  },
  todoTime: {
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
    color: theme.palette.primary.main
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

export interface TodoItemProps {
  index: number
  item: TodoResponse
}

const TodoItem: FC<TodoItemProps> = ({ index, item }) => {
  const classes = useStyles()
  return (
    <Grid item md={6} xs={12}>
      <Card>
        <CardContentStyled>
          <Grid container>
            <Grid md={1} className={classes.todoNumberGrid}>
              <span className={classes.todoNumber}>{index + 1}</span>
            </Grid>
            <Grid md={1}>
              <Checkbox
                checked={true}
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
            <Grid md={9} xs={7} className={classes.todoContent}>
              <Typography component='p' className={classes.todoTime}>
                {item.time}
              </Typography>
              <Typography component='p'>{item.description}</Typography>
            </Grid>
            <Grid md={1} className={classes.deleteTodo}>
              <DeleteForeverIcon />
            </Grid>
          </Grid>
        </CardContentStyled>
      </Card>
    </Grid>
  )
}

export default TodoItem
