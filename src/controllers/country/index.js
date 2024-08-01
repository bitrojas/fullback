/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("countryController.js");
logger.level = "all";

/* MODEL */
const model = require("../../models/countryModel");

/* VALIDATIONS */
const validaCountry = require("../../librarys/validations");

const getCountry = async (req,res) => {
    const countries = await model.find({});
    res.status(201).send(countries);
}
const setCountry = async (req, res) => {
    const {iso_code, iata_code, name_country} = req.body;
    try {
        if(!validaCountry.validateCountryIsoCode(iso_code)){
            throw new Error("Error al validar el Código ISO");
        }
        if(!validaCountry.validateCountryIataCode(iata_code)){
            throw new Error("Error al validar el Código IATA");
        }
        if(!validaCountry.validateCountryName(name_country)){
            throw new Error("Error al validar el Nombre del País");
        }
        const country = await new model({
            iso_code: iso_code,
            iata_code: iata_code,
            name_country: name_country
        })
        await country.save()
            .then((country) => {
                res.status(201).send(country);
            })
            .catch(() => {
                throw new Error("Error al guardar el País");
            })
    } catch (error) {
        res.status(406).send(error.message);
    }
}

const getCountryByIata = async (req,res) => {
    const {iata_code, name_city} = req.body;
    try {
        if(name_city){
            const data = await model.findOne({iata_code:iata_code});
            if (!data){
                return "Error al buscar el country";
            }
            return data;
        }else{
            if(!validaCountry.validateCountryIataCode(iata_code)){
                throw new Error("Error al validar el Código IATA");
            }
            const country = await model.findOne({iata_code:iata_code});
            if (!country){
                throw new Error("Error al buscar el País");
            }
            res.status(200).send(country);
        }
    } catch (error) {
        res.status(406).send(error.message);
    }
}

const getIdByIso = async (req,res) => {
    const {iso_code} = req.body;
    try {
        if(!validaCountry.validateCountryIsoCode(iso_code)){
            throw new Error("Error al validar el Código ISO");
        }
        const country = await model.findOne({iso_code:iso_code});
        if (!country){
            throw new Error("Error al buscar el País");
        }
        res.status(200).send({_id:country._id});
    } catch (error) {
        const responseBody = {
            msg: 'Error',
            message: error.message,
        };
        res.status(404).json(responseBody);
    }
}


module.exports = {
    getCountry,
    setCountry,
    getCountryByIata,
    getIdByIso,
}