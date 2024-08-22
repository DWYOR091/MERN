const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

//router
const categoryRoute = require("./app/api/v1/categories/router");

//middlewares
const handleErrorMiddleware = require("./app/middlewares/handler-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

const v1 = "/api/v1/cms";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("test");
});
app.use(v1, categoryRoute);

//middlewares
app.use(handleErrorMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
