const mongoose = require('mongoose')
const { model, Schema } = mongoose
const bcrypt = require('bcrypt')

const participantsSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Nama depan harus diiisi'],
        minLength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'email harus diisi']
    },
    password: {
        type: String,
        required: [true, 'password harus diisi'],
        minLength: [6, 'Minimal 6 karakter']
    },
    role: {
        type: String,
        default: '-'
    },
    status: {
        type: String,
        enum: ['aktif', 'tidak aktif'],
        default: 'tidak aktif'
    },
    otp: {
        type: String,
        required: true
    }
}, { timestamps: true })

participantsSchema.pre('save', async function (next) {
    const User = this

    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12)
    }

    next()
})

participantsSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = model('Participant', participantsSchema)
