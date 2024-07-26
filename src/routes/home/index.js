const homeController = require("../../controllers/home");
const express = require("express");
const api = express.Router();

api.get('/', homeController.getHome);

module.exports = api;