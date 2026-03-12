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

//Update de Usuario
user.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    if (!name && !email && !password) {
        return res.status(400).json({ msg: "Por favor é necessario adicionar algum dado para ser alterado !" })
    }

    try {
        const dadosUpdate = {}
        if (name) dadosUpdate.name = name
        if (email) dadosUpdate.email = email

        if (password) {
            const passwordHash = await bcrypt.hash(password, 12)
            dadosUpdate.password = passwordHash
        }

        const user = await User.findByIdAndUpdate(id, dadosUpdate)
        if (!user) {
            return res.status(400).json({ msg: 'Usuario não encontrado para update' })
        }

        return res.status(200).json({ msg: "Dados atualizado com sucesso !", dadosUpdate })
    } catch (error) {
        return res.status(500).json({ msg: "Erro no servidor tente novamente mais tarde - ROTA UPDATE USER", error: error.message })
    }
})

//Deleção de Usuarios
user.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(400).json({ msg: 'Usuario nao encontrado para remoção dos dados' })
        }

        return res.status(200).json({ msg: 'Usuario deletado com sucesso' })
    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota de DELETAR USUARIO tente novamente mais tarde', error: error.message })
    }
})



export default user