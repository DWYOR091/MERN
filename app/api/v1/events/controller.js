const { StatusCodes } = require('http-status-codes')
const { getAllEvents, getOneEvent, createEvent, updateEvent, deleteEvent, changeStatusEvents } = require('../../../services/mongoose/events')

const index = async (req, res, next) => {
    try {
        const response = await getAllEvents(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}
const find = async (req, res, next) => {
    try {
        const response = await getOneEvent(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const response = await createEvent(req)
        res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const response = await updateEvent(req)
        res.status(StatusCodes.OK).json({ msg: `event updated`, data: response })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const response = await deleteEvent(req)
        res.status(StatusCodes.OK).json({ msg: `event deleted`, data: response })
    } catch (error) {
        next(error)
    }
}

const changeStatus = async (req, res, next) => {
    try {
        const response = await changeStatusEvents(req)
        res.status(StatusCodes.OK).json({
            msg: 'status updated',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { index, find, create, update, destroy, changeStatus }
