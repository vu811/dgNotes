import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { Container, Paper } from '@material-ui/core'
import CustomTab from '../../common/components/tab'
import AppBar from '@material-ui/core/AppBar'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import FastfoodIcon from '@material-ui/icons/Fastfood'
import LaptopMacIcon from '@material-ui/icons/LaptopMac'
import HotelIcon from '@material-ui/icons/Hotel'
import RepeatIcon from '@material-ui/icons/Repeat'
import Looks5TwoToneIcon from '@material-ui/icons/Looks5TwoTone'
import EmojiTransportationTwoToneIcon from '@material-ui/icons/EmojiTransportationTwoTone'
import EmojiEventsTwoToneIcon from '@material-ui/icons/EmojiEventsTwoTone'
import TabPanel from '../../common/components/tab/tabPanel'

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
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth='md'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'>Thiết lập mục tiêu</Typography>
      </div>
      <Paper elevation={0}>
        <AppBar position='static' color='transparent'>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='scrollable'
            scrollButtons='on'
            indicatorColor='primary'
            textColor='primary'
            aria-label='scrollable force tabs example'
          >
            <CustomTab
              id={0}
              label={'Mục tiêu 2021'}
              icon={<EmojiTransportationTwoToneIcon />}
              index={0}
              value={0}
            />
            <CustomTab
              id={1}
              label={'Mục tiêu 5 năm'}
              icon={<Looks5TwoToneIcon />}
              index={1}
              value={1}
            />
            <CustomTab
              id={2}
              label={'Mục tiêu cuộc đời'}
              icon={<EmojiEventsTwoToneIcon />}
              index={2}
              value={2}
            />
          </Tabs>
        </AppBar>
        <div className={classes.mainGoal}>
          <TabPanel value={value} index={0}>
            <Timeline align='alternate'>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant='body2' color='textSecondary'>
                    Sự nghiệp
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    <FastfoodIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography>Because you need strength</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>
                  <Typography variant='body2' color='textSecondary'>
                    Tài chính
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color='primary'>
                    <LaptopMacIcon />
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h6' component='h1'>
                      Code
                    </Typography>
                    <Typography>Because it&apos;s awesome!</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='primary' variant='outlined'>
                    <HotelIcon />
                  </TimelineDot>
                  <TimelineConnector className={classes.secondaryTail} />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h6' component='h1'>
                      Sleep
                    </Typography>
                    <Typography>Because you need rest</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color='secondary'>
                    <RepeatIcon />
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography variant='h6' component='h1'>
                      Repeat
                    </Typography>
                    <Typography>Because this is the life you love!</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </div>
      </Paper>
    </Container>
  )
}

export default Goal
