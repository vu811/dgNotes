import React, { useEffect, useLayoutEffect } from 'react'
import { withLayout } from '../layouts/container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect
} from 'react-router-dom'
import DashBoard from '../features/dashboard'
import Project from '../features/project'
import Todo from '../features/todo'
import ProjectDetail from '../features/project/components/projectDetail'
import Goal from '../features/goal'
import BucketList from '../features/bucketList'
import Login from '../auth/login'
import Register from '../auth/register'
import { useAppDispatch, useAppSelector } from './hooks'
import { getMeAsync } from '../auth/authSlice'

interface CustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

const App = () => {
  console.log('App')
  const dispatch = useAppDispatch()

  // useLayoutEffect(() => {
  //   console.log('getMeAsync')
  //   dispatch(getMeAsync())
  // }, [])

  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<DashBoard />) },
      { path: '/app/dashboard', render: () => withLayout(<DashBoard />) },
      { path: '/app/todo', render: () => withLayout(<Todo />) },
      {
        exact: true,
        path: '/app/project',
        render: () => withLayout(<Project />)
      },
      {
        path: '/app/project/:id',
        render: () => withLayout(<ProjectDetail />)
      },
      { path: '/app/goal', render: () => withLayout(<Goal />) },
      { path: '/app/bucket-list', render: () => withLayout(<BucketList />) },
      { path: '/auth/login', render: () => <Login /> },
      { path: '/auth/register', render: () => <Register /> }
    ]
    return pages
  }

  const buildPages1 = () => {
    const pages: CustomRouteProps[] = [
      { isPrivate: true, exact: true, path: '/', children: <DashBoard /> },
      { isPrivate: true, path: '/app/dashboard', children: <DashBoard /> },
      { isPrivate: true, path: '/app/todo', children: <Todo /> },
      {
        isPrivate: true,
        exact: true,
        path: '/app/project',
        children: <Project />
      },
      { isPrivate: true, path: '/app/project/:id', children: <ProjectDetail /> },
      { isPrivate: true, path: '/app/goal', children: <Goal /> },
      { isPrivate: true, path: '/app/bucket-list', children: <BucketList /> },
      { path: '/auth/login', children: <Login /> },
      { path: '/auth/register', children: <Register /> }
    ]
    return pages
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {buildPages1().map((route: CustomRouteProps) => {
            const { children, ...rest } = route
            return route.isPrivate ? (
              <PrivateRoute {...rest}>{children}</PrivateRoute>
            ) : (
              <Route {...rest}>{children}</Route>
            )
          })}
          {/* {buildPages().map((route) => (
            <Route {...route} />
          ))} */}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

const PrivateRoute = ({ children, ...rest }: CustomRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated === null) {
      console.log('getMeAsync')
      dispatch(getMeAsync())
    }
  }, [dispatch, isAuthenticated])

  return isAuthenticated !== null ? (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated === true ? (
          withLayout(children)
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  ) : null
}

export default App
