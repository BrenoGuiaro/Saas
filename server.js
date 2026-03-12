import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user from './routes/User.routes.js'
import connect from './config/data.db.js'
import product from './routes/Product.routes.js'
import client from './routes/Client.routes.js'

const route = express()
dotenv.config()
connect()
route.use(express.json())

route.use('/user', user)
route.use('/product', product)
route.use('/client', client)

route.listen(process.env.PORT, console.log(`Rodando na porta ${process.env.PORT}`)) 