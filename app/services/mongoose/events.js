const { populate } = require("dotenv")
const Events = require("../../api/v1/events/model")
const { NotFoundError, BadRequestError } = require('../../errors')
const { checkingImage } = require("./image")
const { checkingCategory } = require("./categories")
const { checkingTalent } = require("./talents")

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query

    let condition = {}
    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: "i" } }
    }

    if (category) {
        condition = { ...condition, category: category }
    }

    if (talent) {
        condition = { ...condition, talent: talent }
    }
    const response = await Events.find(condition)
        .populate({
            path: 'image',
            select: '_id name'
        })
        .populate({
            path: 'category',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' }
        })

    return response
}

const getOneEvent = async (req) => {
    const { id } = req.params
    const response = await Events.findById(id)
        .populate({
            path: 'image',
            select: '_id name'
        })
        .populate({
            path: 'category',
            select: '_id name'
        })
        .populate({
            path: 'talent',
            select: '_id name role image',
            populate: { path: 'image', select: '_id name' }
        })

    if (!response) throw new NotFoundError(`Tidak ada event dengan id: ${id}`)

    return response
}

const createEvent = async (req) => {
    const { title, date, about, tagline, keyPoint, venueName, statusEvent, tickets, image, category, talent } = req.body

    //cek
    await checkingImage(image)
    await checkingCategory(category)
    await checkingTalent(talent)

    //cek title
    const check = await Events.findOne({ title })
    if (check) throw new BadRequestError(`title sudah ada, tidak boleh sama!`)

    const response = await Events.create({ title, date, about, tagline, keyPoint, venueName, statusEvent, tickets, image, category, talent })

    return response
}

const updateEvent = async (req) => {
    const { title, date, about, tagline, keyPoint, venueName, statusEvent, tickets, image, category, talent } = req.body
    const { id } = req.params

    await checkingImage(image)
    await checkingCategory(category)
    await checkingTalent(talent)

    //cek title
    const check = await Events.findOne({ title })
    if (check) throw new BadRequestError(`title sudah ada, tidak boleh sama!`)
    const response = await Events.findByIdAndUpdate(id, { title, date, about, tagline, keyPoint, venueName, statusEvent, tickets, image, category, talent }, { new: true, runValidators: true })

    if (!response) throw new NotFoundError(`Tidak ada event dengan id: ${id}`)

    return response
}
const deleteEvent = async (req) => {
    const { id } = req.params

    const response = await Events.findByIdAndDelete(id)

    return response
}




module.exports = { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent }