const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const app = express();

//router
const categoriesRoute = require("./app/api/v1/categories/router");
const imagesRoute = require("./app/api/v1/images/router");
const talentsRoute = require("./app/api/v1/talents/router");
const eventsRoute = require("./app/api/v1/events/router");
const organizersRoute = require("./app/api/v1/organizers/router");
const authRoute = require("./app/api/v1/auth/router");
const ordersRoute = require("./app/api/v1/orders/router");
const participantsRoute = require("./app/api/v1/participants/router");

//middlewares
const handleErrorMiddleware = require("./app/middlewares/handler-error");
const notFoundMiddleware = require("./app/middlewares/not-found");

const v1 = "/api/v1";

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("test");
});

app.use(`${v1}/cms`, categoriesRoute);
app.use(`${v1}/cms`, imagesRoute);
app.use(`${v1}/cms`, talentsRoute);
app.use(`${v1}/cms`, eventsRoute);
app.use(`${v1}/cms`, organizersRoute);
app.use(`${v1}/cms`, authRoute);
app.use(`${v1}/cms`, ordersRoute);
app.use(`${v1}/auth`, participantsRoute);

//middlewares
app.use(handleErrorMiddleware);
app.use(notFoundMiddleware);

module.exports = app;
