const {
  signupParticipants,
  signinParticipants,
  activateParticipants,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder,
  getAllPaymentsByOrganizer,
} = require("../../../services/mongoose/participants");

const { StatusCodes } = require("http-status-codes");

const signup = async (req, res, next) => {
  try {
    const response = await signupParticipants(req);

    res.status(StatusCodes.CREATED).json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const response = await activateParticipants(req);

    res.status(StatusCodes.OK).json({
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const response = await signinParticipants(req);

    res.status(StatusCodes.OK).json({
      data: { token: response },
    });
  } catch (err) {
    next(err);
  }
};

const getAllLandingPages = async (req, res, next) => {
  try {
    const response = await getAllEvents();
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getDetailLandingPages = async (req, res, next) => {
  try {
    const response = await getOneEvent(req);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const response = await getAllOrders(req);
    res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    const response = await checkoutOrder(req)
    res.status(StatusCodes.CREATED).json(response)
  } catch (error) {
    next(error)
  }
}

const getAllPayment = async (req, res, next) => {
  try {
    const response = await getAllPaymentsByOrganizer(req)
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  activeParticipant,
  signin,
  getDetailLandingPages,
  getAllLandingPages,
  getDashboard,
  checkout,
  getAllPayment
};
