export const getUrlQuery = (query: string) => {
  return query ? query.split('=')[1] : ''
}
