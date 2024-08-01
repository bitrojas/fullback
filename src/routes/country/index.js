const express = require("express");
const api = express.Router();
const control = require("../../controllers/country");
const md_auth = require("../../middlewares/authenticated");

api.post("/", control.setCountry);
api.post("/iata", control.getCountryByIata);
api.post("/iso", control.getIdByIso);
api.get("/country", control.getCountry);

module.exports = api;