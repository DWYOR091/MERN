const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  urlDb: process.env.URL_MONGODB_DEV,
  jwtExpires: "24h",
  JWT_SECRET: process.env.JWT_SECRET,
  gmail: process.env.GMAIL,
  password: process.env.PASSWORD
};
