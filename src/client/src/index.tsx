import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import App from './app/app'
import { Provider } from 'react-redux'
import { store } from './app/store'
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles'

let theme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    fontWeightLight: 400,
    fontWeightBold: 700
  },
  palette: {
    primary: {
      main: '#e62739'
    },
    secondary: {
      main: '#2972E7'
    },
    background: {
      default: 'rgb(246, 248, 251)'
    },
    text: {
      primary: 'rgb(34, 51, 84)'
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 20
      },
      label: {
        fontWeight: 700
      }
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
