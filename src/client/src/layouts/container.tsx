import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getMeAsync } from '../auth/authSlice'
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

export { withLayout }
