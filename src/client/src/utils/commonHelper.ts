export const getUrlQuery = (query: string) => {
  return query ? query.split('=')[1] : ''
}

export const getTotal = (arr?: Array<number>) => {
  return arr?.reduce((a, v) => a + v) ?? 0
}