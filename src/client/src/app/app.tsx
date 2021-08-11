import React from 'react'
import { withLayout } from '../layouts/container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom'
import DashBoard from '../features/dashboard'
import Project from '../features/projectManagement/project'
import Todo from '../features/todoList/todo'
import ProjectDetail from '../features/projectManagement/components/projectDetail'

const App = () => {
  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<DashBoard />) },
      { path: '/todos', render: () => withLayout(<Todo />) },
      { exact: true, path: '/projects', render: () => withLayout(<Project />) },
      {
        path: '/projects/:id',
        render: () => withLayout(<ProjectDetail />)
      }
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
