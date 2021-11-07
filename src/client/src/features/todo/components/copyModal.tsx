import 'date-fns'
import { Theme, withStyles } from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import { useAppDispatch } from '../../../app/hooks'
import { getDate } from '../../../utils/dateTimeHelper'
import { copyTodoAsync, CopyTodoPayload } from '../todoSlice'
import { FC, useState } from 'react'
import { CurrentUserProps } from '../../../auth/authSlice'
import { makeStyles } from '@material-ui/styles'
import { flashAlert } from '../../../app/appSlice'
import { FlashType } from '../../../enums'

const validationSchema = yup.object({
  fromDate: yup.date(),
  toDate: yup.date()
})

interface TodoModalProps extends CurrentUserProps {
  date: string
  open: boolean
  close: () => void
}

const DatePickerStyled = withStyles({
  input: {
    fontWeight: 700
  }
})(DatePicker)

const useStyles = makeStyles((theme: Theme) => ({
  fromDate: {
    marginTop: 10
  },
  toDate: {
    marginTop: 10
  },
  todoDateInput: {
    fontWeight: theme.typography.fontWeightBold
  }
}))

const CopyModal: FC<TodoModalProps> = ({ date, open, close, currentUser }) => {
  const classes = useStyles()
  const [copyDate, setCopyDate] = useState<Date | null>(null)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      fromDate: null,
      toDate: null
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { fromDate, toDate } = values
      const payload: CopyTodoPayload = {
        userId: currentUser?._id ?? '',
        date,
        fromDate,
        toDate
      }
      const saved = await dispatch(copyTodoAsync(payload)).unwrap()
      if (saved) {
        dispatch(
          flashAlert({
            message: 'Copy thành công',
            type: FlashType.Success
          })
        )
        resetForm()
      }
    }
  })

  const disableFromDates = (pDate: any) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayDateStr = getDate(new Date(), true)
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    return date === todayDateStr ? pDate < tomorrow : pDate < today
  }

  const disableToDates = (pDate: any) => {
    return copyDate ? pDate < copyDate : false
  }

  return (
    <Modal
      title='Sao chép todo'
      submitText='Sao chép'
      open={open}
      onClose={close}
      onSubmit={formik.handleSubmit}
    >
      <form noValidate autoComplete='off'>
        <span>
          Hệ thống sẽ copy những todo bạn đang xem đến khoảng thời gian dưới đây
        </span>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerStyled
              id='fromDate'
              name='fromDate'
              label='Ngày'
              value={formik.values.fromDate}
              color='secondary'
              format='dd/MM/yyyy'
              shouldDisableDate={disableFromDates}
              className={classes.fromDate}
              onChange={(val) => {
                formik.setFieldValue('fromDate', val)
                setCopyDate(val)
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePickerStyled
              id='toDate'
              name='toDate'
              label='Đến ngày'
              value={formik.values.toDate}
              color='secondary'
              format='dd/MM/yyyy'
              shouldDisableDate={disableToDates}
              disabled={formik.values.fromDate === null}
              className={classes.toDate}
              onChange={(val) => {
                formik.setFieldValue('toDate', val)
              }}
            />
          </MuiPickersUtilsProvider>
        </div>
      </form>
    </Modal>
  )
}

export default CopyModal
