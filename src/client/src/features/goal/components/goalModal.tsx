import {
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core'
import { useFormik } from 'formik'
import Modal from '../../../common/components/modal'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { objectiveTypes } from '../../../data'
import {
  addGoalAsync,
  GoalProps,
  GoalResProps,
  updateGoalAsync
} from '../goalSlice'

const validationSchema = yup.object({
  goal: yup
    .string()
    .required('Vui lòng nhập mục tiêu')
    .max(500, 'Tối đa 500 kí tự')
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  newProjectBtn: {
    marginBottom: '10px'
  },
  projectWrapper: {
    [theme.breakpoints.up('md')]: {
      maxHeight: 'calc(100vh - 202px)',
      overflowY: 'auto'
    }
  }
}))

const GoalModal = ({ goalType, open, close }: any) => {
  const dispatch = useAppDispatch()
  const goalState = useAppSelector((state) => state.goal.goal)

  const formik = useFormik({
    initialValues: goalState
      ? {
          objectiveType: goalState.objectiveType,
          goal: goalState.goal,
          plan: goalState.plan
        }
      : {
          objectiveType: 0,
          goal: '',
          plan: ''
        },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const { objectiveType, goal, plan } = values
      const payload: GoalResProps = {
        _id: goalState ? goalState._id : '',
        goalType: goalType,
        objectiveType,
        goal,
        plan
      }
      const saved = goalState
        ? await dispatch(updateGoalAsync(payload)).unwrap()
        : await dispatch(addGoalAsync(payload)).unwrap()
      if (saved) resetForm()
    }
  })
  return (
    <Modal
      title={`${goalState ? 'Chỉnh sửa' : 'Thêm'} mục tiêu`}
      open={open}
      onClose={close}
      onSubmit={formik.handleSubmit}
    >
      <form noValidate autoComplete='off'>
        <InputLabel required shrink id='goalTypeLabel'>
          Phân loại
        </InputLabel>
        <Select
          labelId='goalTypeLabel'
          id='goalType'
          fullWidth
          value={formik.values.objectiveType}
          error={Boolean(formik.errors.objectiveType)}
          onChange={formik.handleChange('objectiveType')}
          onBlur={formik.handleBlur}
          color='secondary'
        >
          {objectiveTypes.map((item) => (
            <MenuItem key={item.type} value={item.type}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <TextField
          id='goal'
          name='goal'
          label='Mục tiêu'
          value={formik.values.goal}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.goal)}
          helperText={formik.errors.goal}
          placeholder='Mục tiêu'
          fullWidth
          color='secondary'
          margin='normal'
          multiline
          rows={5}
          required
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          id='plan'
          name='plan'
          label='Kế hoạch'
          value={formik.values.plan}
          onChange={formik.handleChange}
          error={Boolean(formik.errors.plan)}
          helperText={formik.errors.plan}
          placeholder='Kế hoạch'
          fullWidth
          color='secondary'
          margin='normal'
          multiline
          rows={5}
          InputLabelProps={{
            shrink: true
          }}
        />
      </form>
    </Modal>
  )
}

export default GoalModal
