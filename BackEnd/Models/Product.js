const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema




const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    catogory: {
        type: ObjectId,
        ref: "Catogoty",
        required: true

    },
    quantity: {
        type: Number,

    },
    sold: {
        type: Number,
        default:0

    },
    photo: {
        photoPath : String,
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
}, { timestamps: true })




module.exports = mongoose.model('Product', productSchema)