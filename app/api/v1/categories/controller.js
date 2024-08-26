const { StatusCodes } = require("http-status-codes");
const {
  getAllCategories,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
} = require("../../../services/mongoose/categories");

const index = async (req, res, next) => {
  try {
    const response = await getAllCategories(req);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const find = async (req, res, next) => {
  try {
    const response = await getCategoriesById(req);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const response = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
      msg: "Categories created",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const response = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      msg: "Categories updated",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      msg: "Categories deleted",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  find,
  create,
  update,
  destroy,
};
