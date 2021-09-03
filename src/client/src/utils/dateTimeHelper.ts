import moment from 'moment'

export const getTime = (date?: Date) => {
  return date ? moment(date).format('LT') : ''
}

export const getDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD')
}
