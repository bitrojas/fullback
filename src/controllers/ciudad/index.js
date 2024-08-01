/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("cityController.js");
logger.level = "all";

/* MODEL */
const modelCountry = require("../../models/countryModel");
const model = require("../../models/cityModel");

/* CONTROLLER ADD */
const ctrlCountry = require("../country/index.js");

/* VALIDATIONS */
const validacity = require("../../librarys/validations");


const setCity = async (req,res) => {
    const {iso_code, name_city, iata_code} = req.body;
    try {
        if(!validacity.validateCountryIataCode(iata_code)) {
            throw new Error("El País ingresado no es Válido");
        }
        const datacountry = await ctrlCountry.getcountryByIata(req);
        if(!datacountry){
            throw new Error("Error al buscar la city");
        }
        const city = new model({
            iso_code: iso_code,
            name_city: name_city,
            country:datacountry._id
        });
        await city.save()
            .then((city) => {
                res.status(201).send(city);
            })
            .catch(() => {
                throw new Error("Error al guardar la city");
            })
    } catch (error) {
        let response = {
            "error": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}

const getCityByIso = async (req, res) => {
    const {iso_code, state} = req.body;
    try {
        if(!validacity.validateCountryIataCode(iso_code)){
            throw new Error("Error al validar el Código ISO");
        }
        if(state != 'ok'){
            const city = await model.findOne({"iso_code": iso_code});
            if(!city){
                throw new Error("Error al buscar la city");
            }
            res.status(201).send(city);
        }else{
            const city = await model.findOne({"iso_code": iso_code});
            if(!city){
                throw new Error("Error al buscar la city");
            }
            return city;
        }

    } catch (error) {
        let response = {
            "error": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}

const getAllCity = async (req, res) => {
    try {
        const city = await model.find({});
        res.status(201).send(city);
    } catch (error) {
        let response = {
            "error": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}


const setCityMasive = async (req, res) => {
    try {
        const cantidad = Object.keys(req.body).length;
        const promises = [];
        for (let conta = 0; conta < cantidad; conta++){
            try {
                const{iata_code, name_city, iso_code} = req.body[conta];
                if(!validacity.validateCountryIataCode(iata_code)){
                    throw new Error("Error al validar el Código de la city");
                }
                if(!validacity.validateCountryIataCode(iso_code)){
                    throw new Error("Error al validar el Código del País");
                }
                if(!validacity.validateCountryName(name_city)){
                    throw new Error("Error al validar el Nombre de la city");
                }
                const country = await modelCountry.findOne({iata_code:iso_code});
                if(!country){
                    throw new Error("Error al buscar el País");
                }
                const city = await new model({
                    iso_code: iata_code,
                    name_city: name_city,
                    country:country._id
                });
                promises.push(
                    city.save()
                        .then()
                        .catch(() => {
                            throw new Error("Error al guardar la Ciudad");
                        })
                );
            } catch (error) {
                let response = {
                    "state": "Error",
                    "message": error.message
                }
                res.status(503).send(response);
            }
        }
        const ciudades = await Promise.all(promises);
        let response = {
            "state":"Ok",
            "message": ciudades
        }
        res.status(200).send(response);
    } catch (error) {
        let response = {
            "state": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}

const getCityByCountryIso = async (req, res) => {
    try {
        const { id_country } = req.body;
        const country = await countryModel.findOne({ "iata_code": id_country });
        if (!country) {
            throw new Error("País buscado no Existe");
        }
        const cityes = await model.find({"country":country._id});
        if (!cityes) {
            throw new Error("No existen states");
        }
        res.status(200).json(cityes);
    } catch (error) {
        let response = {
            "error": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}

const getcityById = async (req, res) => {
    try {
        const { id } = req.body;
        const cityes = await model.findById({"_id":id});
        if (!cityes) {
            throw new Error("No existen cityes");
        }
        res.status(200).json(cityes);
    } catch (error) {
        let response = {
            "error": "Error",
            "message": error.message
        }
        res.status(406).send(response);
    }
}
module.exports = {
    setCity,
    getCityByIso,
    getAllCity,
    setCityMasive,
    getCityByCountryIso,
    getcityById,
}