const { StatusCodes } = require('http-status-codes')
const { getAllTalents, getOneTalent, createTalent, updateTalent, deleteTalent } = require('../../../services/mongoose/talents')

const index = async (req, res, next) => {
    try {
        const response = await getAllTalents(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const response = await getOneTalent(req)
        res.status(StatusCodes.OK).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const response = await createTalent(req)
        res.status(StatusCodes.CREATED).json({
            msg: "talent created",
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const response = await updateTalent(req)
        res.status(StatusCodes.CREATED).json({
            msg: "talent updated",
            data: response
        })
    } catch (error) {
        next(error)
    }
}
const destroy = async (req, res, next) => {
    try {
        const response = await deleteTalent(req)
        res.status(StatusCodes.CREATED).json({
            msg: "talent deleted",
            data: response
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    index, find, create, update, destroy
}