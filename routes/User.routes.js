import express from 'express'
import User from '../models/User.model.js'
import Business from '../models/Business.model.js'
import bcrypt from 'bcrypt'

const user = express.Router()

//Get de usuarios
user.get('/', async (req, res) => {
    try {
        const Users = await User.find()
        return res.status(200).json({ msg: 'Usuarios encontrados:', data: Users })
    } catch (error) {
        return res.status(500).json({ msg: 'Erro no servidor tente novamente mais tarde', error })
    }
})

//Criação de Usuario
user.post('/create', async (req, res) => {

    const { name, email, password, role, businessName, businessId } = req.body

    try {
        let finalBusinessId = businessId;
        const passwordHash = await bcrypt.hash(password, 12)

        //nesse if eu tive que fazer todo o processo de criação para caso o usuario seja o "master" da empresa
        if (role === "master") {

            const newBusiness = await Business.create({
                name: businessName
            })
            finalBusinessId = newBusiness._id


            const newUser = await User.create({
                name,
                email,
                password: passwordHash,
                role,
                businessId: finalBusinessId
            })

            newBusiness.userID = newUser._id
            await newBusiness.save()

            return res.status(200).json({
                msg: "Usuário master e empresa criados!",
                data: newUser
            })


        }

        //Já aqui fora eu crio basicamente a mesma parte do processo de criação do "master" porem sem a utilização do businessName(propiedade atribuida somente a criação do usuario "master")
        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            role,
            businessId: finalBusinessId
        })
        return res.status(201).json({
            msg: "Usuário criado com sucesso",
            data: newUser
        })


    } catch (error) {
        return res.status(500).json({
            msg: 'Erro no servidor tente novamente mais tarde',
            error: error.message
        })
    }
})



export default user