import React, { useEffect } from 'react'
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
  sharingView?: boolean
  key: string
}

const App = () => {
  const buildPagesWithProtected = () => {
    const pages: CustomRouteProps[] = [
      {
        isPrivate: true,
        exact: true,
        key: 'home',
        path: '/',
        children: <DashBoard />
      },
      {
        isPrivate: true,
        key: 'dashboard',
        path: '/app/dashboard',
        children: <DashBoard />
      },
      { isPrivate: true, key: 'todo', path: '/app/todo', children: <Todo /> },
      {
        isPrivate: true,
        exact: true,
        key: 'product',
        path: '/app/project',
        children: <Project />
      },
      {
        isPrivate: true,
        key: 'product-detail',
        path: '/app/project/:id',
        children: <ProjectDetail />
      },
      { isPrivate: true, key: 'goal', path: '/app/goal', children: <Goal /> },
      {
        isPrivate: true,
        key: 'bucket-list',
        path: '/app/bucket-list',
        children: <BucketList />
      },
      {
        sharingView: true,
        key: 'sharing',
        path: '/app/sharing/:sharingId',
        children: <Todo sharingView={true} />
      },
      {
        key: 'register',
        path: '/auth/register',
        children: <Register />
      },
      {
        key: 'login',
        path: '/auth/login',
        children: <Login />
      }
    ]
    return pages
  }

  const renderRoute = () => {
    const routes = buildPagesWithProtected().map((route: CustomRouteProps) => {
      const { children, ...rest } = route
      if (route.isPrivate)
        return <PrivateRoute {...rest}>{children}</PrivateRoute>
      if (route.sharingView)
        return <Route {...rest} render={() => withLayout(children, true)} />
      return <Route {...rest}>{children}</Route>
    })
    return routes
  }

  return (
    <React.Fragment>
      <Router>
        <Switch>{renderRoute()}</Switch>
      </Router>
    </React.Fragment>
  )
}

const PrivateRoute = ({ children, ...rest }: CustomRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuthenticated === null) {
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
