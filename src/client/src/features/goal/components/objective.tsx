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
import { useAppDispatch } from '../../../app/hooks'
import { GoalProps, GoalResProps, openGoalModal } from '../goalSlice'

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

interface ObjectiveProps {
  goals: GoalResProps[]
}

const Objective = ({ goals }: ObjectiveProps) => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  return (
    <Timeline align='alternate'>
      <div className={classes.groupBtn}>
        <ButtonStyled
          color='secondary'
          variant='contained'
          onClick={() => dispatch(openGoalModal())}
        >
          Thêm mục tiêu
        </ButtonStyled>
        <ButtonStyled color='secondary' variant='outlined'>
          revised
        </ButtonStyled>
        <ButtonStyled color='secondary' variant='outlined'>
          Lịch sử
        </ButtonStyled>
      </div>
      {objectiveTypes.map((objective) => {
        const goalsByObjective = goals.filter(
          (x) => x.objectiveType === objective.type
        )
        return (
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
              {goalsByObjective &&
                goalsByObjective.map((item, index) => (
                  <ObjectiveItem index={index} data={item} />
                ))}
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}

export default Objective
