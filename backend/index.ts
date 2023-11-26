import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import 'module-alias/register'

import userRouter from '@routes/users'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8000

app.use(cors())

app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`Server listen on ${port}`)
})
