import { FC } from 'react'
import Header from './header'
import Footer from './footer'
import SideBar from './sidebar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FlashAlert from '../common/components/flashAlert'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const ContainerStyled = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 64px)'
  }
})(Container)

const DefaultLayout: FC = (props) => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <FlashAlert />
      <Header />
      <div className={classes.root}>
        <SideBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <ContainerStyled maxWidth='lg' className={classes.container}>
            {props.children}
            <Footer />
          </ContainerStyled>
        </main>
      </div>
    </>
  )
}
export default DefaultLayout
