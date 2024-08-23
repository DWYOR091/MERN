const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom-api-error");

//bad request digunakan saat server tidak dpt memproses permintaan dari client
class BadRequestError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
