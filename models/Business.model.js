import { model, Schema } from 'mongoose'

const schemaBusiness = new Schema({
    name: {
        type: String,
        required: true
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

export default model("Business", schemaBusiness)