import express from 'express'
import Product from '../models/Product.model.js'

const product = express.Router()

//Get nos produtos
product.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        return res.status(200).json({ msg: 'Produtos encontrados', product })

    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota GET PRODUCTS', error: error.message })
    }
})

//Criação dos produtos
product.post('/create', async (req, res) => {
    const { name, price, stock, image, businessId } = req.body
    if (!name || !price || !stock || !image || !businessId) {
        return res.status(400).json({ msg: 'Por favor insira os dados necessarios !' })
    }

    try {
        const dadosProduct = {
            name,
            price,
            stock,
            image,
            businessId
        }
        const product = await Product.create(dadosProduct)
        return res.status(200).json({ msg: 'Produto criado com sucesso', product })

    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota de POST PRODUCT', error: error.message })
    }
})

//Update nos produtos
product.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, stock, image } = req.body

    if (!name && !price && !stock && !image) {
        return res.status(400).json({ msg: 'Por favor insira algum dado para ser atualizado' })
    }

    try {
        const dadosUpdate = {}
        if (name) dadosUpdate.name = name
        if (price) dadosUpdate.price = price
        if (stock) dadosUpdate.stock = stock
        if (image) dadosUpdate.image = image

        const product = await Product.findByIdAndUpdate(id, dadosUpdate)
        return res.status(200).json({ msg: 'Produto atualizado com sucesso', dadosUpdate })

    } catch (error) {
        return res.status(500).json({ msg: 'Erro na rota UPDATE PRODUCT', error: error.message })
    }
})

//Deleção de produtos
product.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(400).json({ msg: 'Produto não encontrado para remoção' })
        }

        return res.status(200).json({ msg: 'Produto deletado com sucesso !' })
    } catch (error) {
        return res.status(500).json({ msg: "Erro na rota de DELETAR PRODUCT", error: error.message })
    }
})


export default product