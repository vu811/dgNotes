import { FC } from 'react'
import Header from './header'
import Footer from './footer'
import SideBar from './sidebar'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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

const DefaultLayout: FC = (props) => {
  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Header />
      <div className={classes.root}>
        <SideBar />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth='lg' className={classes.container}>
            {props.children}
            <Footer />
          </Container>
        </main>
      </div>
    </>
  )
}
export default DefaultLayout
