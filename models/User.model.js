import { Schema, model } from "mongoose";

const schemaUser = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['master', 'clerk'],
        required: true
    },
    businessId: {
        type: Schema.Types.ObjectId,
        ref: "Business",
        required: true
    }

}, { timestamps: true })

export default model("User", schemaUser)