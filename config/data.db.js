import mongoose from 'mongoose'

const connect = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connect to Mongo! Database name: ${connection.connections[0].name}`)
    } catch (error) {
        return console.log('Erro ao se conectar com o banco de dados !', error)
    }
}

export default connect