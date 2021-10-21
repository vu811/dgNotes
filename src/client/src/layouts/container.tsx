import { useEffect } from 'react'
import DefaultLayout from './defaultLayout'

const withLayout: any = (component: JSX.Element) => {
  console.log('withLayout')
  return (
    <>
      <DefaultLayout>{component}</DefaultLayout>
    </>
  )
}

export { withLayout }
