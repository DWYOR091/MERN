const { createImage } = require('../../../services/image')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const response = await createImage(req)
        res.status(StatusCodes.CREATED).json({
            msg: `image created`,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    create
}