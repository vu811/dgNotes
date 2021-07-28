import { ReactNode } from 'react'
import DefaultLayout from './defaultLayout'

const withLayout: any = (component: JSX.Element) => {
  return (
    <>
      <DefaultLayout>{component}</DefaultLayout>
    </>
  )
}

export { withLayout }
