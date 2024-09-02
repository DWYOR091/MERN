const { StatusCodes } = require("http-status-codes");
const { signin } = require("../../../services/mongoose/auth");

const signinCMS = async (req, res, next) => {
  try {
    const response = await signin(req);
    res.status(StatusCodes.CREATED).json({
      data: { token: response.token, role: response.result.role },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signinCMS };
