/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("jsonWebToken.js");
logger.level = "all";

/* MODEL */


const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
    const expToken = new Date();
    expToken.setHours(expToken.getHours() + 10);

    // Verificar si agregar 3 horas lleva al siguiente día
    if (expToken.getDate() !== new Date().getDate()) {
        // Si es así, ajustar la hora al último momento del día actual
        expToken.setHours(23, 59, 59, 999);
    }

    // Verificar si al agregar 3 horas al último día del año, la fecha pertenece al próximo año
    const lastDayOfYear = new Date(expToken.getFullYear(), 11, 31);
    if (expToken > lastDayOfYear) {
        // Si es así, ajustar la fecha al primer momento del próximo año
        expToken.setFullYear(expToken.getFullYear() + 1);
        expToken.setMonth(0, 1);
        expToken.setHours(0, 0, 0, 0);
    }

    const payload = {
        token_type: "access",
        userId: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign(payload, process.env.API_ENC);
};

const createRefreshToken = (user) => {
    const expToken = new Date();

    // Obtén el mes actual y año actual
    const currentMonth = expToken.getMonth();
    const currentYear = expToken.getFullYear();

    // Calcula el nuevo mes y año
    let newMonth = currentMonth + 1;
    let newYear = currentYear;

    // Verifica si se debe cambiar de año
    if (newMonth === 12) {
        newMonth = 0;
        newYear += 1;
    }

    // Calcula el último día del nuevo mes considerando si es bisiesto o no
    const lastDayOfMonth = new Date(newYear, newMonth + 1, 0).getDate();

    // Verifica si el día actual es mayor al último día del nuevo mes
    if (expToken.getDate() > lastDayOfMonth) {
        // Si es así, ajusta la fecha al último día del nuevo mes
        expToken.setFullYear(newYear, newMonth, lastDayOfMonth);
    } else {
        // Si no, ajusta la fecha al mismo día del nuevo mes
        expToken.setFullYear(newYear, newMonth, expToken.getDate());
    }

    const payload = {
        token_type: "refresh",
        userId: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    };

    return jwt.sign(payload, process.env.API_ENC);
};


const decodeToken = (token) => {
    return jwt.decode(token, process.env.API_ENC, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decodeToken,
}