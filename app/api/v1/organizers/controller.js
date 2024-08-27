const {
  createOrganizer,
  createUser,
  getAllUsers,
} = require("../../../services/mongoose/users");
const { StatusCodes } = require("http-status-codes");

const createOrganizers = async (req, res, next) => {
  try {
    const response = await createOrganizer(req);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

const createUsers = async (req, res, next) => {
  try {
    const response = await createUser(req);
    res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const response = await getAllUsers();
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { createUsers, createOrganizers, getUsers };
