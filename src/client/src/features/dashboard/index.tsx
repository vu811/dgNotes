import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Typography } from '@material-ui/core'
import ChartTotal from './components/chartTotal'
import PlaylistAddCheckTwoToneIcon from '@material-ui/icons/PlaylistAddCheckTwoTone'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import TrackChangesRoundedIcon from '@material-ui/icons/TrackChangesRounded'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  DashboardType,
  getDashboardAsync,
  selectDashboard
} from '../dashboard/dashboardSlice'
import { useEffect, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    minHeight: 300
  },
  welcome: {
    fontSize: '2rem',
    lineHeight: 1.25
  },
  doughnutChart: {
    height: 200
  }
}))

export default function DashBoard() {
  const classes = useStyles()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const dispatch = useAppDispatch()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    getDashboardData()
  }, [])

  const getDashboardData = async () => {
    const result = await dispatch(getDashboardAsync()).unwrap()
    console.log(result)
    const dashBoard = setDashboardData(result)
    console.log(dashBoard)
    setData(dashBoard)
  }

  const setDashboardData = (dashboardData: DashboardType) => {
    return {
      todo: {
        labels: ['Hoàn thành', 'Chưa hoàn thành'],
        datasets: [
          {
            label: 'Hoàn thành',
            data: dashboardData.todo,
            backgroundColor: ['#2972E7', '#b1d0f2'],
            borderColor: ['#2972E7', '#b1d0f2'],
            borderWidth: 1
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },
      bucketList: {
        labels: ['Hoàn thành', 'Chưa hoàn thành'],
        datasets: [
          {
            label: 'Hoàn thành',
            data: dashboardData.bucketList,
            backgroundColor: ['#2972E7', '#b1d0f2'],
            borderColor: ['#2972E7', '#b1d0f2'],
            borderWidth: 1
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },
      goal: {
        labels: ['Mục tiêu 2022', 'Mục tiêu 5 năm', 'Mục tiêu cuộc đời'],
        datasets: [
          {
            label: 'Hoàn thành',
            data: dashboardData.goalCompleted,
            backgroundColor: '#2972E7',
            stack: '1'
          },
          {
            label: 'Chưa hoàn thành',
            data: dashboardData.goalPending,
            backgroundColor: '#b1d0f2',
            stack: '1'
          }
        ]
      }
    }
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} lg={12}>
          <Typography variant='subtitle1' className={classes.welcome}>
            Xin chào, Vu 👋
          </Typography>
          <Typography variant='body2' component='span' color='textSecondary'>
            Chúc bạn nhiều năng lượng để hoàn thành tốt công việc hôm nay nhé!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <ChartTotal
              total={'14'}
              title={'Tổng todo'}
              icon={{
                icon: <PlaylistAddCheckTwoToneIcon />,
                color: '#e62739',
                backgroundColor: 'rgba(255, 25, 67, 0.1)'
              }}
            />
            <div className={classes.doughnutChart}>
              {data?.todo && (
                <Doughnut data={data.todo} options={data.todo.options} />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <ChartTotal
              total={'15'}
              title={'Tổng bucket'}
              icon={{
                icon: <FormatListNumberedIcon />,
                color: '#e62739',
                backgroundColor: 'rgba(255, 25, 67, 0.1)'
              }}
            />
            <div className={classes.doughnutChart}>
              {data?.bucketList && (
                <Doughnut
                  data={data.bucketList}
                  options={data.bucketList.options}
                />
              )}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div>
              <ChartTotal
                total={'Mục tiêu'}
                title={'Biểu đồ thống kê'}
                icon={{
                  icon: <TrackChangesRoundedIcon />,
                  color: '#e62739',
                  backgroundColor: 'rgba(255, 25, 67, 0.1)'
                }}
              />
            </div>
            <div>{data?.goal && <Bar data={data.goal} />}</div>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
