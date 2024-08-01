/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("homeController.js");
logger.level = 'all';

const getHome = (req, res) => {
    try {
        let response = {
            "msg": "Todo Ok",
            "data": [
                {
                    "dato1": "ok",
                    "dato2": "bien"
                },
                {
                    "dato3": "bad",
                    "dato4": "mal"
                }
            ]
        }
        res.status(200).send(response);
    } catch (error) {
        let response = {
            "msg": error.message,
            "data": []
        }
        res.status(500).send(response);
    }
}

module.exports = {
    getHome,
}