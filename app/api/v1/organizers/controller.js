const { createOrganizer } = require('../../../services/mongoose/users')
const { StatusCodes } = require('http-status-codes')

const create = async (req, res, next) => {
    try {
        const response = await createOrganizer(req)
        res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
        next(error)
    }

}

module.exports = { create }