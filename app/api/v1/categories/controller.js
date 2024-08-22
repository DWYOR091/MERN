const Category = require('./model')

const index = async (req, res, next) => {
    try {
        const response = await Category.find()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const find = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Category.findOne({ _id: id })
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const { name } = req.body
        const response = await Category.create({ name })
        res.status(201).json({
            msg: 'category created',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name } = req.body
        const response = await Category.findOneAndUpdate({ _id: id }, { name })
        res.status(200).json({
            msg: 'category updated'
        })
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const { id } = req.params
        await Category.findOneAndDelete({ _id: id })
        res.status(200).json({
            msg: 'category deleted'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    index, find, create, update, destroy
}