import React from 'react'
import { withLayout } from '../layouts/container'
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom'
import DashBoard from '../features/dashboard'
import Project from '../features/projectManagement/project'

const App = () => {
  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<DashBoard />) },
      { path: '/projects', render: () => withLayout(<Project />) }
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
