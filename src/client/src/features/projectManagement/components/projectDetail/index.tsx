import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Paper } from '@material-ui/core'
import TodoItem from '../../../todoList/components/todoItem'
import CustomTab from '../../../../common/components/customTab'
import TabPanel from '../../../../common/components/tabPanel'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import VersionModal from '../versionModal'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks'
import { useParams } from 'react-router-dom'
import {
  closeVersionModal,
  getProjectAsync,
  openVersionModal
} from '../../projectSlice'

const useStyles = makeStyles((theme: Theme) => ({
  versionList: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    marginTop: '5px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5em'
  },
  task: {
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid rgba(0, 0, 0, 0.12)'
  },
  addTaskBtn: {
    marginLeft: '10px'
  }
}))
const ProjectDetail = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const isOpenVersionModal = useAppSelector(
    (state) => state.project.isOpenVersionModal
  )

  const projectDetail = useAppSelector((state) => state.project.projectDetail)
  const dispatch = useAppDispatch()
  let { id }: any = useParams()

  useEffect(() => {
    dispatch(getProjectAsync(id))
  }, [id])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log('dfdf')
    setValue(newValue)
  }
  return (
    <Container maxWidth='md'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'> Dự án: dgNOTES</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => dispatch(openVersionModal())}
          >
            thêm phiên bản
          </Button>
          <Button
            variant='contained'
            color='secondary'
            className={classes.addTaskBtn}
            startIcon={<AddCircleOutlineIcon />}
          >
            thêm công việc
          </Button>
        </div>
      </div>
      <Paper elevation={0} className={classes.versionList}>
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
        >
          {projectDetail?.versions &&
            projectDetail?.versions.map((verison, index) => (
              <CustomTab label={verison.name} index={index} />
            ))}
        </Tabs>
        <TabPanel value={value} index={0}>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
          <div className={classes.task}>
            <TodoItem
              index={1}
              item={{
                _id: 'dfdfdf',
                time: 'fdf',
                date: 'fdfdf',
                description: 'fddfd'
              }}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
      </Paper>
      <VersionModal
        id={id}
        open={isOpenVersionModal}
        close={() => dispatch(closeVersionModal())}
      />
    </Container>
  )
}

export default ProjectDetail
