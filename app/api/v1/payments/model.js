const mongoose = require('mongoose')
const { model, Schema } = mongoose

const paymentSchema = new Schema({
    type: {
        type: String,
        required: [true, 'type harus diisi!'],
        minLength: 3,
        maxLength: 50
    },
    image: {
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    status: {
        type: Boolean,
        enum: [true, false],
        default: true,
    },
    organizer: {
        type: mongoose.Types.ObjectId,
        ref: 'Organizer',
        required: true,
    },
},
    { timestamps: true })

module.exports = model('Payment', paymentSchema)