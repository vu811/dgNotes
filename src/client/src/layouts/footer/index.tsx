import { Box, Typography } from '@material-ui/core'

const Footer = () => {
  return (
    <Box pt={4}>
      <Typography variant='body2' color='textSecondary' align='center'>
        Made with{' '}
        <span role='img' aria-label='heart' aria-hidden='false'>
          ❤️
        </span>{' '}
        by Vu811
      </Typography>
    </Box>
  )
}

export default Footer
