const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors')

const app = express();

//router 
const categoryRoute = require('./app/api/v1/categories/router')

const v1 = '/api/v1/cms'

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(v1, categoryRoute)
app.get('/', (req, res) => {
    res.send('test')
})

module.exports = app;
