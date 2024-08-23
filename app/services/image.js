const Images = require('../api/v1/images/model')

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

module.exports = { createImage, generateUrlImg }