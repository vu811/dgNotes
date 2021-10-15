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

const App = () => {
  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<DashBoard />) },
      { path: '/todo', render: () => withLayout(<Todo />) },
      { exact: true, path: '/project', render: () => withLayout(<Project />) },
      {
        path: '/project/:id',
        render: () => withLayout(<ProjectDetail />)
      },
      { path: '/goal', render: () => withLayout(<Goal />) },
      { path: '/bucket-list', render: () => withLayout(<BucketList />) }
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
