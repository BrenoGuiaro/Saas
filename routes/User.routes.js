import express from 'express'

const user = express()

user.get('/',(req,res)=>{
    res.send('Teste')
})


export default user