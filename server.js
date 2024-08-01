/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("server.js");
logger.level = 'all';

/* SERVER */
const express = require("express");

/* APP */
const app = express();

/* PARSER */
const parser = require("body-parser");

/* CORS */
const cors = require("cors");

/* ROUTES */
const { home, country, cities } = require("./src/routes");

/* PARSER CONFIG */
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

/* CORS CONFIG */
app.use(cors());

/* ROUTER CONFIG */
const base_path = '/api/' + process.env.API_VERS;
app.use(base_path + '/home', home);
app.use(base_path + '/country', country);
app.use(base_path + '/cities', cities);

/* STATICS FOLDERS */
app.use(express.static('uploads'));

module.exports = app;