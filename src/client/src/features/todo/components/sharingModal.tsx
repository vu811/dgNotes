import { FC, useEffect, useState } from 'react'
import { Button, Paper, Theme } from '@material-ui/core'
import Modal from '../../../common/components/modal'
import { makeStyles } from '@material-ui/styles'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  paper: {
    boxShadow: 'none',
    padding: 10,
    color: 'rgb(4, 41, 122)',
    backgroundColor: 'rgb(208, 242, 255)'
  }
}))

interface SharingModalProps {
  open: boolean
  close: () => void
}

const SharingModal: FC<SharingModalProps> = ({ open, close }) => {
  const classes = useStyles()
  const sharingId = useAppSelector((state) => state.todo.sharingId)
  const [sharingUrl, setSharingUrl] = useState<string | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sharingId) {
      setSharingUrl(`${window.location.origin}/app/sharing/${sharingId}`)
    }
  }, [sharingId])

  const handleCopy = () => {
    dispatch(
      flashAlert({
        message: 'Đã copy',
        type: FlashType.Success
      })
    )
    navigator.clipboard.writeText(sharingUrl ?? '')
  }

  return (
    <Modal
      title='Share'
      submitText='Đóng'
      isInfoModal={true}
      open={open}
      onClose={close}
      onSubmit={close}
    >
      <div className={classes.root}>
        <Paper className={classes.paper}>{sharingUrl}</Paper>
        <Button startIcon={<FileCopyOutlinedIcon />} onClick={handleCopy}>
          Copy
        </Button>
      </div>
    </Modal>
  )
}

export default SharingModal
