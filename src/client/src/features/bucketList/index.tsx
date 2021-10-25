import { FC, useEffect } from 'react'
import {
  makeStyles,
  Theme,
  Container,
  Typography,
  Button
} from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CurrentUserProps } from '../../auth/authSlice'
import NoItemPage from '../../common/components/noItemPage'
import { withContainer } from '../../layouts/container'
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

interface BucletListTypeProps extends CurrentUserProps {}

const BucketList: FC<BucletListTypeProps> = ({ currentUser }) => {
  const classes = useStyles()
  const isOpenBucketModal = useAppSelector(
    (state) => state.bucket.isOpenBucketModal
  )
  const bucketList = useAppSelector((state) => state.bucket.bucketList)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getBucketListAsync(currentUser?._id))
    }
  }, [currentUser?._id])

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
          currentUser={currentUser}
        />
      )}
    </Container>
  )
}

export default withContainer(BucketList)
