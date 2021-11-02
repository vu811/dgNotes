import React from 'react'
import { useAppSelector } from '../app/hooks'
import DefaultLayout from './defaultLayout'

const withLayout: any = (component: JSX.Element) => {
  return (
    <>
      <DefaultLayout>{component}</DefaultLayout>
    </>
  )
}

// const withContainer =
//   <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
//   ({ ...props }) => {
//     console.log('withContainer')
//     const currentUser = useAppSelector((state) => state.auth.currentUser)
//     return <Component {...props} currentUser={currentUser} />
//   }

function withContainer<P>(Component: React.ComponentType<P>) {
  const WrapperComponent = (props: P) => {
    const currentUser = useAppSelector((state) => state.auth.currentUser)
    return <Component {...props} currentUser={currentUser} />
  }
  return WrapperComponent
}

export { withLayout, withContainer }
