import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  TimePicker
} from '@material-ui/pickers'
// @ts-ignore
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { Grid, makeStyles, Theme, TextField } from '@material-ui/core'
import Modal from '../../common/components/modal'
import { useFormik } from 'formik'
import * as yup from 'yup'

const validationTodoSchema = yup.object({
  startTime: yup.date(),
  endTime: yup.date(),
  description: yup
    .string()
    .required('Vui lòng nhập ngày bắt đầu')
    .max(100, 'Tối đa 100 kí tự')
})

const useStyles = makeStyles((theme: Theme) => ({
  addTodoBtn: {
    display: 'inline-flex',
    marginLeft: '30px'
  },
  todoDate: {
    verticalAlign: 'bottom'
  }
}))

const Todo = () => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      startTime: new Date(),
      endTime: new Date(),
      description: ''
    },
    validationSchema: validationTodoSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <div>
      <Grid>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='startDate'
            name='startDate'
            label='Ngày'
            value={new Date()}
            color='secondary'
            format='dd/MM/yyyy'
            className={classes.todoDate}
            onChange={(val) => {}}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        <div className={classes.addTodoBtn}>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AddCircleOutlineIcon />}
            //className={classes.newProjectBtn}
            //onClick={() => dispatch(openProjectModal())}
          >
            thêm todo
          </Button>
        </div>
        <div>
          <Modal open={true} onClose={() => {}} onSubmit={formik.handleSubmit}>
            <form
              //className={classes.root}
              noValidate
              autoComplete='off'
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  id='startTime'
                  name='startTime'
                  label='Từ'
                  value={formik.values.startTime}
                  onChange={(val) => {
                    formik.setFieldValue('startTime', val)
                  }}
                  color='secondary'
                  okLabel='Chọn'
                  cancelLabel='Hủy'
                />
                <TimePicker
                  id='endTime'
                  name='endTime'
                  label='Đến'
                  value={formik.values.endTime}
                  onChange={(val) => {
                    formik.setFieldValue('endTime', val)
                  }}
                  color='secondary'
                  okLabel='Chọn'
                  cancelLabel='Hủy'
                />
              </MuiPickersUtilsProvider>
              <TextField
                id='description'
                name='description'
                label='Nội dung'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.description)}
                helperText={formik.errors.description}
                placeholder='Nội dung'
                fullWidth
                color='secondary'
                margin='normal'
                InputLabelProps={{
                  shrink: true
                }}
              />
            </form>
          </Modal>
        </div>
      </Grid>
    </div>
  )
}

export default Todo
