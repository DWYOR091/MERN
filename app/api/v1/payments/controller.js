const { StatusCodes } = require('http-status-codes')

const {
    getAllPayments, createPayment, getOnePayment, updatePayment, deletePayment, checkingPayment
} = require("../../../services/mongoose/payments")


const index = async (req, res, next) => {
    try {
        const response = await getAllPayments(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const find = async (req, res, next) => {
    try {
        const response = await getOnePayment(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const create = async (req, res, next) => {
    try {
        const response = await createPayment(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const update = async (req, res, next) => {
    try {
        const response = await updatePayment(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const destroy = async (req, res, next) => {
    try {
        const response = await deletePayment(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}

module.exports = { index, find, create, update, destroy }