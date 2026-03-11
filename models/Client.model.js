import { model, Schema } from 'mongoose'

const schemaClient = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    },
    phone: {
        type: String,
        required: true
    },
    businessId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Business"
    }
}, { timestamps: true })

export default model('Client', schemaClient)