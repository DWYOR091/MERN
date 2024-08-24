const Images = require('../../api/v1/images/model')
const { NotFoundError } = require('../../errors')

const generateUrlImg = (req) => {
    const response = `uploads/${req.file.filename}`

    return response
}
const createImage = async (req) => {
    const response = await Images.create({
        name: req.file ? `uploads/${req.file.filename}` : `uploads/avatar/avatar.png`
    })

    return response
}

const checkingImage = async (id) => {
    const response = await Images.findOne({ _id: id })
    if (!response) throw new NotFoundError(`Tidak ada image dengan id: ${id}`)

    return response
}

module.exports = { createImage, generateUrlImg, checkingImage }