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

/*
mongodb+srv://<username>:<password>@imperial.ffnbucj.mongodb.net/?retryWrites=true&w=majority&appName=imperial

mongodb+srv://dev_usr_imp@imperial.ffnbucj.mongodb.net/
*/
PORT = process.env.API_PORT;

(async () => {
    try {
        switch (process.env.NODE_ENV) {
            case 'prd':
                URI = `mongodb+srv://prd_${process.env.DB_USER}:prd_${process.env.DB_PASS}@imperial.ffnbucj.mongodb.net/`
                //logger.error(URI);
                break;
            case 'dev':
                URI = `mongodb+srv://dev_${process.env.DB_USER}:dev_${process.env.DB_PASS}@imperial.ffnbucj.mongodb.net/`
                //logger.info(URI);
                break;
            case 'tst':
                URI = `mongodb+srv://tst_${process.env.DB_USER}:tst_${process.env.DB_PASS}@imperial.ffnbucj.mongodb.net/`
                //logger.trace(URI);
                break;
        }
        await mongo.connect(URI);
        logger.debug(`Connect to BDD ${process.env.NODE_ENV}_${process.env.DB_NAME}`);
        await app.listen(PORT, () => {
            logger.debug("Server it's Running.... in PORT " + PORT + ", en Ambiente de: " + process.env.NODE_ENV);
        });
    } catch (error) {
        let response = {
            "Title": "Error",
            "Message":error.message
        }
        logger.fatal(response);
    }
})();