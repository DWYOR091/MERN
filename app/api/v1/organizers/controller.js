const {
  createOrganizer,
  createUser,
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

module.exports = { createUsers, createOrganizers };
