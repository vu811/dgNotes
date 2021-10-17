import moment from 'moment'

export const getTime = (date: string) => {
  return date ? moment(date).format('LT') : ''
}

export const getDate = (date: Date | null, isForUrl = false) => {
  return moment(date).format(isForUrl ? 'YYYY-MM-DD' : 'DD/MM/YYYY')
}
