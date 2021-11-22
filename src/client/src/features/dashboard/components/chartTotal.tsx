import React, { FC } from 'react'
import {
  Avatar,
  makeStyles,
  Typography,
  Theme,
  createStyles
} from '@material-ui/core'

const useStyles = makeStyles<Theme, ChartTotalThemeProps>((theme: Theme) =>
  createStyles({
    welcome: {
      fontSize: '2rem',
      lineHeight: 1.25
    },
    icon: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      width: 50,
      height: 50,
      marginRight: 5,
      color: ({ iconColor }) => iconColor,
      backgroundColor: ({ iconBackgroundColor }) => iconBackgroundColor
    }
  })
)

interface ChartTotalProps {
  total: string
  title: string
  icon: ChartTotalIconProps
}

interface ChartTotalIconProps {
  icon: any
  color: string
  backgroundColor: string
}

interface ChartTotalThemeProps {
  iconColor: string
  iconBackgroundColor: string
}

const ChartTotal: FC<ChartTotalProps> = ({ total, title, icon }) => {
  const styleProps: ChartTotalThemeProps = {
    iconColor: icon.color,
    iconBackgroundColor: icon.backgroundColor
  }
  const classes = useStyles(styleProps)
  return (
    <div className={classes.icon}>
      <div>
        <Avatar variant='rounded' className={classes.avatar}>
          {icon.icon}
        </Avatar>
      </div>
      <div>
        <Typography variant='subtitle1' className={classes.welcome}>
          {total}
        </Typography>
        <Typography variant='body2' component='span' color='textSecondary'>
          {title}
        </Typography>
      </div>
    </div>
  )
}

export default ChartTotal
