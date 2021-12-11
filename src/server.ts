import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import connectDb from './config/db'
import routes from './routes'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'
import { permissionHandler } from './middlewares/permissionHandler'
import path from 'path'

const __dirname = path.resolve()
dotenv.config()

connectDb()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(permissionHandler)

routes(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/client/build'))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'src', 'client', 'build', 'index.html')
    )
  })
}

app.use(errorHandler)

const PORT: string | number = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
