import express from 'express'
import Client from '../models/Client.model.js'


const client = express.Router()

//Get nos Clients
client.get("/", async (req, res) => {
    try {
        const client = await Client.find()
        return res.status(200).json({ msg: 'Clientes encontrado:', client })
    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota GET CLIENT', error: error.messsage })
    }
})

//Create Client
client.post("/create", async (req, res) => {
    const { name, email, phone, businessId } = req.body
    if (!name || !email || !phone || !businessId) {
        return res.status(400).json({ msg: "Por favor insira todos os campos necessarios!" })
    }

    try {
        const dadosClient = {
            name,
            email,
            phone,
            businessId
        }

        const client = await Client.create(dadosClient)
        return res.status(200).json({ msg: `Client criado com sucesso, seja bem vindo ${client.name}` })
    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota CREATE CLIENT', error: error.message })
    }
})






export default client