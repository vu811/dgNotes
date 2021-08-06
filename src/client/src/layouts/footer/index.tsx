import { Box, makeStyles, Typography, withStyles } from '@material-ui/core'

const BoxStyled = withStyles({
  root: {
    marginTop: 'auto'
  }
})(Box)

const useStyles = makeStyles((theme) => ({
  footerText: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const Footer = () => {
  const classes = useStyles()
  return (
    <BoxStyled pt={4}>
      <Typography variant='body2' align='center' className={classes.footerText}>
        Made with{' '}
        <span role='img' aria-label='heart' aria-hidden='false'>
          ❤️
        </span>{' '}
        by 811
      </Typography>
    </BoxStyled>
  )
}

export default Footer
