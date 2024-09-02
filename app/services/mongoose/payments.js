const Payments = require('../../api/v1/payments/model')
const { BadRequestError, NotFoundError } = require('../../errors')
const { checkingImage } = require('../mongoose/image')

const getAllPayments = async (req) => {
    const { organizer } = req.user
    const response = await Payments.find({ organizer }).populate({
        path: "image",
        select: "_id name"
    }).select('_id type status image')

    return response
}


const createPayment = async (req) => {
    const { type, image } = req.body
    const { organizer } = req.user

    await checkingImage(image)

    const check = Payments.findOne({ type, organizer })
    if (!check) throw new BadRequestError(`Tipe pembayaran sudah ada!`)

    const response = await Payments.create({
        type, image, organizer
    })

    return response
}

const getOnePayment = async (req) => {
    const { id } = req.params
    const { organizer } = req.user

    const response = await Payments.findOne({ _id: id, organizer }).populate({
        path: "image",
        select: "_id name"
    }).select("_id type status image")
    if (!response) throw new NotFoundError(`Tidak ada payment dengan id: ${id}`)

    return response
}

const updatePayment = async (req) => {
    const { id } = req.params
    const { organizer } = req.user
    const { type, image } = req.body

    await checkingImage(image)

    const response = await Payments.findOneAndUpdate(
        { _id: id },
        { type, image, organizer },
        { new: true, runValidators: true }
    )

    if (!response) throw new NotFoundError(`Tidak ada payment dengan id: ${id}`)

    return response
}

const deletePayment = async (req) => {
    const { id } = req.params
    const { organizer } = req.user

    const response = await Payments.findOneAndDelete({ _id: id, organizer })
    if (!response) throw new NotFoundError(`Tidak ada payment dengan id: ${id}`)

    return response
}

const checkingPayment = async (id) => {
    const response = Payments.findOne({ _id: id })
    if (!response) throw new NotFoundError(`Tidak ada payment dengan id: ${id}`)

    return response
}

module.exports = { getAllPayments, createPayment, getOnePayment, updatePayment, deletePayment, checkingPayment }