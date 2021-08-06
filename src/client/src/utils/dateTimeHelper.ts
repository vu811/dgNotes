export const getTime = (date: Date) => {
  return date.toISOString().split('T')[1].substr(0, 5)
}

export const getDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}
