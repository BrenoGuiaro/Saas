import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user from './routes/User.routes.js'
import connect from './config/data.db.js'

const route = express()
dotenv.config()
connect()
route.use(express.json())

route.use('/user', user)

route.listen(process.env.PORT, console.log(`Rodando na porta ${process.env.PORT}`)) 