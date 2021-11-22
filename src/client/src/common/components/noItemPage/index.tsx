import { FC } from 'react'
import {
  Card,
  CardContent,
  Grid,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core'
import notFound from '../../../assets/images/not-found.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: 'calc(100vh - 300px)'
    },
    content: {
      //height: 'calc(100vh - 300px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: '2em',
      fontWeight: theme.typography.fontWeightBold as number,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em'
      }
    }
  })
)

interface NoItemProps {
  text: string
}

const NoItemPage: FC<NoItemProps> = ({ text }) => {
  const classes = useStyles()
  return (
    <Grid item md={12} xs={12}>
      <Card>
        <CardContent>
          <div className={classes.content}>
            <img src={notFound} />
            <div className={classes.text}>{text}</div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default NoItemPage
