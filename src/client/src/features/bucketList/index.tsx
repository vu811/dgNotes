import {
  makeStyles,
  Theme,
  Container,
  Typography,
  Button
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import BucketItem from './component/bucketItem'

const useStyles = makeStyles((theme: Theme) => ({
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  }
}))

const BucketList = () => {
  const classes = useStyles()
  return (
    <Container maxWidth='md'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'>Bucket list</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
          >
            <span>thêm</span>
          </Button>
        </div>
      </div>
      {[0, 1, 16, 17, 18, 19].map((item) => (
        <BucketItem index={item} data={item} />
      ))}
    </Container>
  )
}

export default BucketList
