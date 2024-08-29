const nodemailer = require('nodemailer')
const fs = require('fs')
const mustache = require('mustache')
const { gmail, password } = require('../../config')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: gmail,
        pass: password,
    },
});

const otpMail = async (email, data) => {
    try {
        let template = fs.readFileSync('app/views/email/otp.html', 'utf-8')

        let msg = {
            from: gmail,
            to: email,
            subject: 'Otp for registration is: ',
            html: mustache.render(template, data)
        }

        return await transporter.sendMail(msg)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { otpMail }