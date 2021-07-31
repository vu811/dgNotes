import dotenv from 'dotenv'
import express, { Express } from 'express'
import cors from 'cors'
import connectDb from './config/db'
import routes from './routes'

dotenv.config()

connectDb()

const app: Express = express()

app.use(cors())
app.use(express.json())

routes(app)

const PORT: string | number = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
