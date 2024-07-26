/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("server.js");
logger.level = 'all';

/* BDD */
const mongo = require("mongoose");
mongo.set('strictQuery', false);

/* SERVER */
const app = require('./server');

var PORT = undefined;
var URI = undefined;

PORT = process.env.API_PORT;

(async () => {
    try {
        await app.listen(PORT, () => {
            logger.debug("Server it's Running.... in PORT " + PORT + ", en Ambiente de: " + process.env.NODE_ENV);
        });
    } catch (error) {
        logger.fatal("Server is Not Running...");
    }
})();