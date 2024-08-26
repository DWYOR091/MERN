const jwt = require("jsonwebtoken");
const { JWT_SECRET, jwtExpires } = require("../config");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: jwtExpires,
  });

  return token;
};

const isTokenValid = ({ token }) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  createJWT,
  isTokenValid,
};
