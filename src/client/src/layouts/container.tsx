import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { CurrentUserProps, getMeAsync, UserProps } from '../auth/authSlice'
import DefaultLayout from './defaultLayout'

const withLayout: any = (component: JSX.Element) => {
  console.log('withLayout')
  // const dispatch = useAppDispatch()
  // const currentUser = useAppSelector((state) => state.auth.currentUser)
  // console.log('currentUser', currentUser)
  // useEffect(() => {
  //   console.log('getMeAsync')
  //   if (!currentUser) dispatch(getMeAsync())
  // }, [])

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
