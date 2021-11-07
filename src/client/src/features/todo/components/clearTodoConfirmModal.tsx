import { FC } from 'react'
import Modal from '../../../common/components/modal'
import { CurrentUserProps } from '../../../auth/authSlice'
import { Typography } from '@material-ui/core'
import { getDate } from '../../../utils/dateTimeHelper'

interface ClearTodoConfirmModalProps extends CurrentUserProps {
  date: string
  open: boolean
  close: () => void
  onSubmit: () => void
}

const ClearTodoConfirmModal: FC<ClearTodoConfirmModalProps> = ({
  date,
  open,
  close,
  onSubmit
}) => {
  return (
    <Modal
      title='Xác nhận'
      submitText='Đồng ý'
      open={open}
      onClose={close}
      onSubmit={onSubmit}
    >
      <Typography variant='body1' component='span' color='textPrimary'>
        {'Bạn muốn xóa hết Todo của ngày: '}
        <Typography variant='subtitle1' component='span' color='textPrimary'>
          {getDate(new Date(date))}?
        </Typography>
      </Typography>
    </Modal>
  )
}

export default ClearTodoConfirmModal
