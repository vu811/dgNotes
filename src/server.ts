import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import connectDb from './config/db'
import routes from './routes'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler'
import { permissionHandler } from './middlewares/permissionHandler'

dotenv.config()

connectDb()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

routes(app)

// Middlewares
app.use(errorHandler)
app.use(permissionHandler)

const PORT: string | number = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
