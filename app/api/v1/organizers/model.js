const mongoose = require('mongoose')
const { model, Schema } = mongoose

const organizerSchema = Schema({
    organizer: {
        type: String,
        required: [true, 'Organizer harus diisi']
    }
}, { timestamps: true })

module.exports = model('Organizer', organizerSchema)