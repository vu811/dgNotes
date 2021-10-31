import React, { Component, useEffect, useLayoutEffect } from 'react'
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

  useLayoutEffect(() => {
    console.log('getMeAsync')
    dispatch(getMeAsync())
  }, [])

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
      { isPrivate: true, exact: true, path: '/', component: DashBoard },
      { isPrivate: true, path: '/app/dashboard', component: DashBoard },
      { isPrivate: true, path: '/app/todo', children: <Todo /> },
      {
        isPrivate: true,
        exact: true,
        path: '/app/project',
        component: Project
      },
      { isPrivate: true, path: '/app/project/:id', component: ProjectDetail },
      { isPrivate: true, path: '/app/goal', component: Goal },
      { isPrivate: true, path: '/app/bucket-list', component: BucketList },
      { path: '/auth/login', children: <Login /> },
      { path: '/auth/register', children: <Register /> }
    ]
    return pages
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {/* {buildPages1().map((route: CustomRouteProps) => {
            const { children, ...rest } = route
            return route.isPrivate ? (
              <PrivateRoute {...rest}>{children}</PrivateRoute>
            ) : (
              <Route {...rest}>{children}</Route>
            )
          })} */}
          {buildPages().map((route) => (
            <Route {...route} />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

const PrivateRoute = ({ children, ...rest }: CustomRouteProps) => {
  // const dispatch = useAppDispatch()
  const currentUser = useAppSelector((state) => state.auth.currentUser)
  console.log('currentUser', document.cookie)
  // useLayoutEffect(() => {
  //   console.log('getMeAsync')
  //   if (!currentUser) dispatch(getMeAsync())
  // }, [])

  return (
    <Route
      {...rest}
      render={() =>
        currentUser ? (
          withLayout(children)
        ) : (
          <Redirect
            to={{
              pathname: '/auth/login'
              //state: { from: location }
            }}
          />
        )
      }
    />
  )
}

export default App
