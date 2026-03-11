import Express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user from './routes/User.routes.js'

const route = Express()
dotenv.config()

route.use('/user' , user)

route.listen(process.env.PORT, console.log(`Rodando na porta ${process.env.PORT}`)) 