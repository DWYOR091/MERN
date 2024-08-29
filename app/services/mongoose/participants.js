const Participants = require('../../api/v1/participants/model')

const { NotFoundError, BadRequestError, UnauthorizedError } = require('../../errors')
const { otpMail } = require('../mail')
const { createJWT, createTokenParticipant } = require('../../utils')

const signupParticipants = async (req) => {
    const { firstName, lastName, email, password, role } = req.body;
    const otp = Math.floor(Math.random() * 9999);

    let result = await Participants.findOne({ email, status: 'tidak aktif' });

    if (result) {
        result.firstName = firstName;
        result.lastName = lastName;
        result.email = email;
        result.password = password;  // Password akan di-hash di middleware
        result.role = role;
        result.otp = otp;
        await result.save();
    } else {
        result = await Participants.create({
            firstName, lastName, email, password, role, otp
        });
    }

    await otpMail(email, result);

    // Menggunakan `toObject()` agar hasilnya berupa objek JavaScript biasa
    result = result.toObject();

    // Menghapus properti sensitif
    delete result.password;
    delete result.otp;

    return result;
}



const activateParticipants = async (req) => {
    const { email, otp } = req.body

    const check = Participants.findOne({ email })
    if (!check) throw new BadRequestError(`Participant belum terdaftar!`)
    if (check && check.otp !== otp) throw new BadRequestError(`Kode OTP yang dimasukan salah!`)

    const result = await Participants.findByIdAndUpdate(check._id, {
        status: 'aktif',

    }, { new: true })

    return result
}

const signinParticipants = async (req) => {
    const { email, password } = req.body

    if (!email || !password) throw new NotFoundError(`Please provided your email and password`)

    const result = await Participants.findOne({ email })
    if (!result) throw new UnauthorizedError(`Invalid Credentials`)

    if (result.status !== 'aktif') throw new UnauthorizedError(`Akun anda belum aktif!`)

    const isPasswordCorrect = await Participants.comparePassword(password)
    if (!isPasswordCorrect) throw new UnauthorizedError(`Invalid Credetials`)

    const token = createJWT({ payload: createTokenParticipant(result) })

    return token
}

module.exports = {
    signupParticipants, activateParticipants, signinParticipants
}