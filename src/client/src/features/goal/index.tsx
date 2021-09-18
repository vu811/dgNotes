import React, { useEffect, useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { Container, Paper } from '@material-ui/core'
import CustomTab from '../../common/components/tab'
import AppBar from '@material-ui/core/AppBar'
import TabPanel from '../../common/components/tab/tabPanel'
import { goalTypes } from '../../data'
import Objective from './components/objective'
import GoalModal from './components/goalModal'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { closeGoalModal, getGoalsAsync } from './goalSlice'

const useStyles = makeStyles((theme: Theme) => ({
  versionList: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginTop: '5px',
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 231px)',
      overflowY: 'auto'
    }
  },
  mainGoal: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 284px)',
      overflowY: 'auto'
    }
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.25em'
  },
  task: {
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  addTaskBtn: {
    marginLeft: '10px'
  },
  versionBtnGroup: {
    marginBottom: '0.75em'
  },
  divideer: {
    marginBottom: '0.75em'
  },
  paper: {
    padding: '6px 16px',
    marginBottom: '0.75em'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}))

const Goal = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const isOpenGoalModal = useAppSelector((state) => state.goal.isOpenGoalModal)
  const goals = useAppSelector((state) => state.goal.goals)
  const [goalType, setGoalType] = useState(0)

  useEffect(() => {
    dispatch(getGoalsAsync(goalType))
  }, [goalType])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setGoalType(newValue)
  }

  return (
    <Container maxWidth='lg'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'>Thiết lập mục tiêu</Typography>
      </div>
      <Paper elevation={0}>
        <AppBar position='static' color='transparent'>
          <Tabs
            value={goalType}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='on'
            indicatorColor='primary'
            textColor='primary'
            aria-label='scrollable force tabs example'
          >
            {goalTypes.map((goal) => (
              <CustomTab
                label={goal.name}
                icon={goal.icon}
                index={goal.type}
                value={goal.type}
              />
            ))}
          </Tabs>
        </AppBar>
        <div className={classes.mainGoal}>
          <TabPanel value={goalType} index={0}>
            <Objective goals={goals} />
          </TabPanel>
          <TabPanel value={goalType} index={1}>
            <Objective goals={goals} />
          </TabPanel>
          <TabPanel value={goalType} index={2}>
            <Objective goals={goals} />
          </TabPanel>
        </div>
      </Paper>
      <GoalModal
        goalType={goalType}
        open={isOpenGoalModal}
        close={() => dispatch(closeGoalModal())}
      />
    </Container>
  )
}

export default Goal
