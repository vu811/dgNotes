import {
  Box,
  makeStyles,
  withStyles,
  Theme,
  createStyles
} from '@material-ui/core'
import logo from '../../assets/images/logo.png'

const BoxStyled = withStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 'auto',
      [theme.breakpoints.down('sm')]: {
        paddingTop: 10
      }
    }
  })
)(Box)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerText: {
      fontWeight: 900
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    },
    footerBox: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: 30
      }
    },
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
)

const Footer = () => {
  const classes = useStyles()
  return (
    <BoxStyled className={classes.footerBox} pt={4}>
      <div className={classes.root}>
        <div>
          <span className={classes.footerText}>Made with </span>
          <span role='img' aria-label='heart' aria-hidden='false'>
            ❤️
          </span>
          <span className={classes.footerText}>{' by '}</span>
        </div>
        <div>
          <a
            className={classes.link}
            href='https://www.vu811.com'
            target='_blank'
          >
            <img src={logo} alt='logo' />
          </a>
        </div>
      </div>
    </BoxStyled>
  )
}

export default Footer
