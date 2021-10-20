import React from 'react'
import { withLayout } from '../layouts/container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom'
import DashBoard from '../features/dashboard'
import Project from '../features/project'
import Todo from '../features/todo'
import ProjectDetail from '../features/project/components/projectDetail'
import Goal from '../features/goal'
import BucketList from '../features/bucketList'
import Login from '../auth/login'
import Register from '../auth/register'

const App = () => {
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

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {buildPages().map((route) => (
            <Route {...route} />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
