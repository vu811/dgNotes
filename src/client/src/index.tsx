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
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const breakpoints = createBreakpoints({})

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
    fontWeightBold: 700,
    subtitle1: {
      fontWeight: 700
    }
  },
  palette: {
    primary: {
      main: '#e62739'
    },
    secondary: {
      main: '#2972E7'
    },
    background: {
      default: 'rgb(246, 248, 251)',
      paper: 'rgb(255, 255, 255)'
    },
    text: {
      primary: 'rgb(34, 51, 84)'
    },
    warning: {
      light: '#fff5c7',
      main: '#fae2a0'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*::-webkit-scrollbar': {
          width: '8px'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '20px',
          backgroundColor: '#F5F5F5'
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '20px',
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)'
        }
      }
    },
    MuiButton: {
      root: {
        borderRadius: 5
      },
      label: {
        fontWeight: 700
      }
    },
    MuiPaper: {
      elevation0: {
        boxShadow:
          'rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px'
      },
      elevation1: {
        boxShadow:
          'rgb(159 162 191 / 18%) 0px 9px 16px, rgb(159 162 191 / 32%) 0px 2px 2px'
      }
    },
    MuiTab: {
      root: {
        [breakpoints.up('xs')]: {
          minWidth: '50px'
        },
        fontWeight: 700
      }
    }
  },
  props: {
    MuiButton: {
      size: 'small'
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
