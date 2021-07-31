import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './app/app'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles'

let theme = createTheme({
  palette: {
    primary: {
      main: '#e62739'
    },
    secondary: {
      main: '#2972E7'
    }
  }
})
theme = responsiveFontSizes(theme)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
