import {
  makeStyles,
  Theme,
  Container,
  Typography,
  Button
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import NoItemPage from '../../common/components/noItemPage'
import {
  closeBucketModal,
  getBucketListAsync,
  openBucketModal
} from './bucketSlice'
import BucketItem from './component/bucketItem'
import BucketModal from './component/bucketModal'

const useStyles = makeStyles((theme: Theme) => ({
  navigator: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  }
}))

const BucketList = () => {
  const classes = useStyles()
  const isOpenBucketModal = useAppSelector(
    (state) => state.bucket.isOpenBucketModal
  )
  const bucketList = useAppSelector((state) => state.bucket.bucketList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getBucketListAsync())
  }, [])

  return (
    <Container maxWidth='md'>
      <div className={classes.navigator}>
        <Typography variant='subtitle1'>Bucket list</Typography>
        <div>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => dispatch(openBucketModal({ isAddNew: true }))}
          >
            <span>thêm</span>
          </Button>
        </div>
      </div>
      {bucketList && bucketList.length > 0 ? (
        bucketList.map((item, index) => (
          <BucketItem index={index} data={item} />
        ))
      ) : (
        <NoItemPage text='Chưa có bucket nào!' />
      )}
      {isOpenBucketModal && (
        <BucketModal
          open={isOpenBucketModal}
          close={() => dispatch(closeBucketModal())}
        />
      )}
    </Container>
  )
}

export default BucketList
