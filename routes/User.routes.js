import express from 'express'
import User from '../models/User.model.js'
import Business from '../models/Business.model.js'

const user = express.Router()

user.get('/', async (req, res) => {
    try {
        const Users = await User.find()
        return res.status(200).json({ msg: 'Usuarios encontrados:', data: Users })
    } catch (error) {
        return res.status(500).json({ msg: 'Erro no servidor tente novamente mais tarde', error })
    }
})

user.post('/create', async (req, res) => {

    const { name, email, password, role, businessName } = req.body

    try {
        let business
        let businessId

        if (role === "master") {

            business = await Business.create({
                name: businessName
            })



            businessId = business._id
        }

        const newUser = await User.create({
            name,
            email,
            password,
            role,
            businessId
        })
        
        business.userID = newUser._id
        await business.save()


        return res.status(201).json({
            msg: "Usuário criado com sucesso",
            data: newUser
        })

    } catch (error) {
        return res.status(500).json({
            msg: 'Erro no servidor tente novamente mais tarde',
            error
        })
    }
})


export default user