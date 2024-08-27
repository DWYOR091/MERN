const { getAllOrders } = require('../../../services/mongoose/orders')
const { StatusCodes } = require('http-status-codes')

const index = async (req, res, next) => {
    try {
        const response = await getAllOrders(req)
        res.status(StatusCodes.OK).json({
            data: response.data,
            pages: response.pages,
            total: response.total
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { index }