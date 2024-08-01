const cityController = require("../../controllers/ciudad");
const express = require("express");
const api = express.Router();

//api.post('/all', cityController.getAllCity);
api.put('/set', cityController.setCityMasive);

module.exports = api;