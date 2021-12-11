import {
  Box,
  makeStyles,
  Typography,
  withStyles,
  Theme,
  createStyles
} from '@material-ui/core'

const BoxStyled = withStyles({
  root: {
    marginTop: 'auto'
  }
})(Box)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerText: {
      fontWeight: 900
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  })
)

const Footer = () => {
  const classes = useStyles()
  return (
    <BoxStyled pt={4}>
      <Typography variant='body2' align='center'>
        <span className={classes.footerText}>Made with </span>
        <span role='img' aria-label='heart' aria-hidden='false'>
          ❤️
        </span>{' '}
        <span className={classes.footerText}>
          by{' '}
          <a
            className={classes.link}
            href='https://vu811.netlify.app'
            target='_blank'
          >
            811
          </a>{' '}
        </span>
      </Typography>
    </BoxStyled>
  )
}

export default Footer
