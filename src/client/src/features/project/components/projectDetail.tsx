import React, { useState, useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  withStyles
} from '@material-ui/core'
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
  TaskProps,
  VersionProps
} from '../projectSlice'
import TaskModal from './taskModal'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Task from './task'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'
import NoItemPage from '../../../common/components/noItemPage'
import { grey, red } from '@material-ui/core/colors'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { getDate } from '../../../utils/dateTimeHelper'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      marginTop: '0.75em',
      marginBottom: '0.75em'
    },
    taskHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px'
    },
    taskText: {
      fontWeight: theme.typography.fontWeightBold as number
    }
  })
)

const ListItemIconStyled = withStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '30px'
    }
  })
)(ListItemIcon)

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

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

  const handleClickMoreButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMorePopup = () => {
    setAnchorEl(null)
  }

  const handleChange = (event: React.ChangeEvent<any>, versionId: String) => {
    setCurrentTab(versionId)
  }

  const hanldleEditVersion = (version: VersionProps) => {
    handleCloseMorePopup()
    dispatch(openVersionModal(version))
  }

  const handleDeleteVersion = async () => {
    handleCloseMorePopup()
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
        <Typography variant='subtitle1'>
          Dự án: {projectDetail?.name}
        </Typography>
        <Button
          variant='contained'
          color='secondary'
          startIcon={<NewReleasesIcon />}
          onClick={() => dispatch(openVersionModal(null))}
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
              projectDetail?.versions.map((version) => {
                return (
                  <TabPanel value={currentTab} index={version._id}>
                    <Grid container>
                      <Grid md={11}>
                        <div>
                          <Typography
                            variant='subtitle2'
                            color='textPrimary'
                            component='span'
                          >
                            {'Start date - '}
                          </Typography>
                          <Typography
                            variant='subtitle1'
                            color='textPrimary'
                            component='span'
                          >
                            {getDate(version.startDate)}
                          </Typography>

                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            {version.description}
                          </Typography>
                        </div>
                      </Grid>
                      <Grid md={1}>
                        <IconButton
                          aria-label='more'
                          onClick={handleClickMoreButton}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMorePopup}
                        >
                          <MenuItem onClick={() => hanldleEditVersion(version)}>
                            <ListItemIconStyled>
                              <EditIcon style={{ color: grey[500] }} />
                            </ListItemIconStyled>
                            <Typography>Chỉnh sửa</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => handleDeleteVersion()}>
                            <ListItemIconStyled>
                              <DeleteForeverIcon style={{ color: red[500] }} />
                            </ListItemIconStyled>
                            <Typography>Xóa</Typography>
                          </MenuItem>
                        </Menu>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divideer} />
                    <div className={classes.taskHeader}>
                      <div className={classes.taskText}>Tasks</div>
                      <Button
                        variant='outlined'
                        color='secondary'
                        className={classes.addTaskBtn}
                        startIcon={<PlaylistAddIcon />}
                        onClick={() => dispatch(openTaskModal(null))}
                      >
                        thêm
                      </Button>
                    </div>

                    {version?.tasks && version.tasks.length > 0 ? (
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
                      })
                    ) : (
                      <NoItemPage text='Chưa có công việc nào!' />
                    )}
                  </TabPanel>
                )
              })}
          </>
        )}
        {noItem && <NoItemPage text='Chưa có phiên bản nào!' />}
      </Paper>
      {isOpenVersionModal && (
        <VersionModal
          id={id}
          open={isOpenVersionModal}
          close={() => dispatch(closeVersionModal())}
        />
      )}
      {isOpenTaskModal && (
        <TaskModal
          projectId={id}
          versionId={currentTab}
          open={isOpenTaskModal}
          close={() => dispatch(closeTaskModal())}
        />
      )}
    </Container>
  )
}

export default ProjectDetail
