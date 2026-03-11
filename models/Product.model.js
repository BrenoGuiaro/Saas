import { model, Schema } from 'mongoose'

const schemaProduct = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    image: {
        type: String,
    },
    businessId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Business"
    }

}, { timestamps: true })

export default model('Product', schemaProduct)