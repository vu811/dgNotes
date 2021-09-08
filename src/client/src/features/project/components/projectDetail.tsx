import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import { Button, Container, Divider, Paper } from '@material-ui/core'
import CustomTab from '../../../common/components/tab'
import TabPanel from '../../../common/components/tab/tabPanel'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import VersionModal from './versionModal'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { useParams } from 'react-router-dom'
import {
  closeTaskModal,
  closeVersionModal,
  deleteVersionAsync,
  getProjectAsync,
  openTaskModal,
  openVersionModal,
  ProjectBasePayload,
  ProjectDetailProps,
  TaskProps
} from '../projectSlice'
import TaskModal from './taskModal'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Task from './task'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import NoItemPage from '../../../common/components/noItemPage'

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
  },
  versionBtnGroup: {
    marginBottom: '0.75em'
  },
  divideer: {
    marginBottom: '0.75em'
  }
}))

const ProjectDetail = () => {
  const classes = useStyles()
  const isOpenVersionModal = useAppSelector(
    (state) => state.project.isOpenVersionModal
  )
  const isOpenTaskModal = useAppSelector(
    (state) => state.project.isOpenTaskModal
  )
  const projectDetail = useAppSelector((state) => state.project.projectDetail)
  const [currentTab, setCurrentTab] = useState<any>(null)
  const dispatch = useAppDispatch()
  let { id }: { id: string } = useParams()
  const [isDeletedVersion, setIsDeletedVersion] = useState(0)
  const [noItem, setNoItem] = useState(false)

  useEffect(() => {
    dispatch(getProjectAsync(id))
      .unwrap()
      .then((projectDetail: ProjectDetailProps) => {
        setNoItem(
          !projectDetail?.versions || projectDetail?.versions.length === 0
        )
        setCurrentTab(projectDetail?.versions[0]?._id)
      })
  }, [id, isDeletedVersion])

  const handleChange = (event: React.ChangeEvent<any>, versionId: String) => {
    setCurrentTab(versionId)
  }

  const handleDeleteVersion = async () => {
    try {
      const payload: ProjectBasePayload = {
        projectId: id,
        versionId: currentTab
      }
      const result = await dispatch(deleteVersionAsync(payload)).unwrap()
      if (result) {
        dispatch(
          flashAlert({ message: 'Xóa thành công!', type: FlashType.Success })
        )
        setIsDeletedVersion(Math.random())
      }
    } catch (err) {
      dispatch(flashAlert({ message: err, type: FlashType.Error }))
    }
  }

  return (
    <Container maxWidth='md'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'> Dự án: dgNOTES</Typography>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<NewReleasesIcon />}
          onClick={() => dispatch(openVersionModal())}
        >
          thêm phiên bản
        </Button>
      </div>
      <Paper elevation={0} className={classes.versionList}>
        {projectDetail?.versions && projectDetail?.versions.length > 0 && (
          <>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              scrollButtons='off'
              indicatorColor='primary'
              textColor='primary'
              value={currentTab}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              className={classes.tabs}
            >
              {projectDetail?.versions &&
                projectDetail?.versions.map((version, index) => (
                  <CustomTab
                    id={version._id}
                    label={version.name}
                    index={index}
                    value={version._id}
                  />
                ))}
            </Tabs>
            {projectDetail?.versions &&
              projectDetail?.versions.map((version, index) => {
                return (
                  <TabPanel value={currentTab} index={version._id}>
                    <div className={classes.versionBtnGroup}>
                      <Button
                        variant='outlined'
                        color='secondary'
                        className={classes.addTaskBtn}
                        startIcon={<PlaylistAddIcon />}
                        onClick={() => dispatch(openTaskModal())}
                      >
                        thêm công việc
                      </Button>
                      <Button
                        variant='outlined'
                        color='primary'
                        size='small'
                        className={classes.addTaskBtn}
                        startIcon={<DeleteForeverIcon />}
                        onClick={handleDeleteVersion}
                      >
                        xóa phiên bản
                      </Button>
                    </div>
                    <Divider className={classes.divideer} />
                    {version?.tasks &&
                      version?.tasks.map((task: TaskProps, index) => {
                        return (
                          <div className={classes.task}>
                            <Task
                              projectId={id}
                              versionId={currentTab}
                              index={index}
                              task={task}
                            />
                          </div>
                        )
                      })}
                  </TabPanel>
                )
              })}
          </>
        )}
        {noItem && <NoItemPage text='Chưa có phiên bản nào!' />}
      </Paper>
      <VersionModal
        id={id}
        open={isOpenVersionModal}
        close={() => dispatch(closeVersionModal())}
      />
      <TaskModal
        projectId={id}
        versionId={currentTab}
        open={isOpenTaskModal}
        close={() => dispatch(closeTaskModal())}
      />
    </Container>
  )
}

export default ProjectDetail
