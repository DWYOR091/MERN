const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpires: "10m",
  JWT_SECRET: process.env.JWT_SECRET,
};
