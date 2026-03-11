import { model, Schema } from 'mongoose'

const schemaSale = new Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    clientId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Client"
    },
    total: {
        type: Number,
        required: true
    },
    businessId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Business"
    }
}, { timestamps: true })

export default model('Sale', schemaSale)