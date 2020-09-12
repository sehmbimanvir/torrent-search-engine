import APIRoutes from './routes/api.route'
import WebRoutes from './routes/web.route'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { join } from 'path'
import cors from 'cors'

dotenv.config()

const mongoURI: string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err: any) => {
  if (err) {
    console.log(mongoURI)
    console.log('Something went wrong...', err)
  } else {
    console.log('DB Connected...')
  }
})

const app: Application = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use('/api', APIRoutes)
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use('/', WebRoutes)

app.get('/', (req, res) => res.send('API Working'))
app.listen(PORT, () => console.log(`Server running on ${PORT}`))