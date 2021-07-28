import express, { Express } from 'express'
import cors from 'cors'

const app: Express = express()

app.use(cors())
app.use(express.json())

const PORT: string | number = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`))
