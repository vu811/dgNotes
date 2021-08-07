import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { closeFlashAlert } from '../../../app/appSlice'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const FlashAlert = () => {
  const flashAlert = useAppSelector((state) => state.app.flashAlert)
  const dispatch = useAppDispatch()
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={flashAlert.isOpenFlashAlert}
      autoHideDuration={5000}
      onClose={() => dispatch(closeFlashAlert())}
    >
      <Alert severity={flashAlert.type}>{flashAlert.message}</Alert>
    </Snackbar>
  )
}

export default FlashAlert
