const Categories = require('../../api/v1/categories/model')
const { BadRequestError, NotFoundError } = require('../../errors')

const getAllCategories = async () => {
    const response = await Categories.find();

    return response
}

const getCategoriesById = async (req) => {
    const { id } = req.params;
    const response = await Categories.findById(id);
    if (!response) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return response
}

const createCategories = async (req) => {
    const { name } = req.body;
    const check = await Categories.findOne({ name })
    if (check) throw new BadRequestError(`Nama kategori sudah ada!`)
    const response = await Categories.create({ name });

    return response
}

const updateCategories = async (req) => {
    const { id } = req.params
    const { name } = req.body

    const check = await Categories.findOne({ name })
    if (check) throw new BadRequestError(`Nama kategori sudah ada!`)

    const response = await Categories.findByIdAndUpdate(id,
        { name },
        { new: true, runValidator: true })
    if (!response) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return response
}

const deleteCategories = async (req) => {
    const { id } = req.params
    const response = await Categories.findByIdAndDelete(id)
    if (!response) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`)

    return response
}

module.exports = {
    getAllCategories,
    getCategoriesById,
    createCategories,
    updateCategories,
    deleteCategories
}