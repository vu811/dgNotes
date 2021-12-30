import { Paper, Theme, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import { schedulers } from '../../data'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  scheduler: {
    width: '12%'
  },
  day: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 25, 67, 0.1)',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeightBold as number,
    color: '#e62739'
  },
  dayItem: {
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'white'
  },
  time: {
    fontWeight: theme.typography.fontWeightBold as number,
    textAlign: 'center'
  },
  descr: {
    fontWeight: theme.typography.fontWeightBold as number,
    textAlign: 'center'
  }
}))

const Scheduler = () => {
  const classes = useStyles()
  return (
    <Grid className={classes.root} container spacing={1}>
      {schedulers.map((scheduler) => (
        <Grid className={classes.scheduler} item>
          <Paper className={classes.day}>{scheduler.name}</Paper>
          {scheduler.works &&
            scheduler.works.map((work) => {
              return (
                <Paper className={classes.dayItem}>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.time}
                  >
                    {work.time}
                  </Typography>
                  <Typography component='p' className={classes.descr}>
                    {work.descr}
                  </Typography>
                </Paper>
              )
            })}
        </Grid>
      ))}
    </Grid>
  )
}

export default Scheduler
