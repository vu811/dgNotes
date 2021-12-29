import { Paper } from '@material-ui/core'
import Grid, { GridSpacing } from '@material-ui/core/Grid'

const Scheduler = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent='center' spacing={2}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper>sdsdsd</Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Scheduler
