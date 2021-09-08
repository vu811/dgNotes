import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import { Button, Paper, Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { objectiveTypes } from '../../../data'
import ObjectiveItem from './objectiveItem'
import { withStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: '6px 16px',
    marginBottom: '0.75em'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  },
  groupBtn: {
    marginLeft: '16px'
  }
}))

const ButtonStyled = withStyles({
  root: {
    marginRight: '5px'
  }
})(Button)

const Objective = () => {
  const classes = useStyles()
  return (
    <Timeline align='alternate'>
      <div className={classes.groupBtn}>
        <ButtonStyled color='secondary' variant='contained'>
          Thêm mục tiêu
        </ButtonStyled>
        <ButtonStyled color='secondary' variant='outlined'>
          revised
        </ButtonStyled>
        <ButtonStyled color='secondary' variant='outlined'>
          Lịch sử
        </ButtonStyled>
      </div>
      {objectiveTypes.map((objective) => (
        <TimelineItem>
          <TimelineOppositeContent>
            <Typography variant='subtitle1' color='textPrimary'>
              {objective.name}
            </Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={objective.color} variant={objective.variant}>
              {objective.icon}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <ObjectiveItem index={item} />
            ))}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default Objective
