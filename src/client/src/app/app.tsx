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

const App = () => {
  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<DashBoard />) },
      { path: '/todos', render: () => withLayout(<Todo />) },
      { exact: true, path: '/projects', render: () => withLayout(<Project />) },
      {
        path: '/projects/:id',
        render: () => withLayout(<ProjectDetail />)
      },
      { path: '/goals', render: () => withLayout(<Goal />) }
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
