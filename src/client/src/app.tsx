import React from 'react'
import { withLayout } from './layouts/container'
import { BrowserRouter as Router, Switch, Route, RouteProps } from 'react-router-dom'
import Home from './pages'
import Page1 from './pages/page1'

const App = () => {
  const buildPages = () => {
    const pages: RouteProps[] = [
      { exact: true, path: '/', render: () => withLayout(<Home />) },
      { path: '/page1', render: () => withLayout(<Page1 />) }
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
