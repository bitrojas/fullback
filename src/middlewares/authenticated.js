/* ENVIRONMENT */
const dotenv = require("dotenv").config();

/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("authenticated.js");
logger.level = "all";

/* JSONWEBTOKEN */
const jwt = require("../librarys/tokens/jwt");

/* MODELS */
const userModel = require("../models/usersModel");
const cargoModel = require("../models/worksModel");
const deptoModel = require("../models/deptosModel");
const gradoModel = require("../models/gradesModel");
const viewModel = require("../models/viewsModel");
const workModel = require("../models/workersModel");
const subModel = require("../models/subDeptoModel");
const viewsModel = require("../models/viewsModel");
const procesoModel = require("../models/processModel");
const actionModel = require("../models/actionsModel");

/* UTILS */
//const encrypt = require("encryptjs");
//const { link } = require("../routes/home");


const asureAuth = async (req, res, next) => {
    /* FUNCION QUE VALIDA QUE EL TOKEN SEA VALIDO */
    try {
        const token = req.headers.authorization;
        if (!token){
            throw new Error("No tiene autorizado ver éste contenido");
        }
        next();
    } catch (error) {
        res.status(401).send(error.message);
    }
}
/*
    Formatea la fecha de la siguiente manera
    DD-MM-AAAA
    const expirationDate = new Date(exp)
    const expToken = `${expirationDate.getDate().toString().padStart(2, '0')}-${(expirationDate.getMonth() + 1).toString().padStart(2, '0')}-${expirationDate.getFullYear()}`;
 */
const accesoView = async (req, res, next) => {
    try {
        const token = req.headers.authorization.slice(7, -1);
        if (!token){
            throw new Error("No tiene autorizado ver éste contenido");
        }
        const {userId, exp} = jwt.decodeToken(token);
        const fechaActual = new Date();
        if(fechaActual > exp){
            throw new Error("Debe logearse nuevamente");
        }
        let user = await userModel.findById(userId);
        if(!user){
            throw new Error("Usuario sin Autorización de Ingreso.");
        }
        let grado = await gradoModel.findById(user.usu_grado);
        if(!grado){
            throw new Error("Usuario sin Autorización de Ingreso;");
        }
        const vista = req.originalUrl;
        let view = await viewModel.findOne({"view_back":vista});
        if(!view){
            throw new Error("Vista no Autorizada");
        }
        let trabajador = await workModel.findById(user.usu_trabajador);
        if(!trabajador){
            throw new Error("Trabajador no Autorizado");
        }
        let depto = await deptoModel.findById(trabajador.depto_worker);
        if(!depto){
            throw new Error("Departamento no Existe");
        }
        if(!(view.view_depto === depto.area || view.view_depto >= 997) && !(view.view_perm <= grado.grado_access)){
            throw new Error("Trabajador sin Permisos suficientes");
        }
        next();
    } catch (error) {
        let data = {
            "response": "error",
            "message":error.message
        }
        res.status(403).send(data);
    }
}


const getPermissions = async (req, res, next) => {
    /*
        In this function, the user's encrypted data is received in the body in addition to the token,
        This data is sent to the server to validate if the user of the token is the same as the user of the data,
        in addition to validating if the view you are requesting is within the list of views that the user has access to
        65b427df70f5c4b6c5908b99
        65b427df70f5c4b6c5908bab
    */
    try {
        const { data, view } = req.body;
        const token = req.headers.authorization.slice(7, -1);
        const { userId } = jwt.decodeToken(token);
        const arrDepto = [];
        const arrSub = [];
        const arrProcess = [];
        const arrAction = [];
        const links = [];
        const dataUser = await userModel.findById(userId);
        if (!dataUser) {
            throw new Error("Usuario sin Autorización de Ingreso");
        }
        const vistas = dataUser.vistas;
        const tempo = [];
        for (let ind = 0; ind < Object.keys(vistas).length; ind++) {
            let vista = await viewsModel.findById(vistas[ind]);
            let sub = await subModel.findOne({ "_id": vista.view_sub });
            let subExist = arrSub.some((subItem) => subItem.key === vista.view_sub.toString());
            if (!subExist) {
                arrSub.push({ "key": vista.view_sub.toString(), "label": sub.depto_name, "link": sub.depto_name, "depto": sub.depto.toString(), "submenu": [] });
            }
            let accion = await actionModel.findById(vista.view_accion);
            let actionExist = arrAction.some((itemAction) => itemAction.key === accion._id.toString());
            if (!actionExist) {
                arrAction.push({ "key": accion._id.toString(), "label": accion.accion, "proceso": vista.view_process.toString(), "link": vista.view_front });
            }
            let process = await procesoModel.findById(vista.view_process);
            let processExist = arrProcess.some((itemProcess) => itemProcess.key === process._id.toString());
            if (!processExist) {
                arrProcess.push({ "key": process._id.toString(), "label": process.proceso, "link": process.proceso, "sub": process.sub_depto.toString(), "submenu": [] });
            }
            let depto = await deptoModel.findById(sub.depto);
            let deptoExist = arrDepto.some((deptoItem) => deptoItem.key === sub.depto.toString());
            if (!deptoExist) {
                arrDepto.push({ "key": depto._id.toString(), "label": depto.depto_name, "submenu": [] });
            }
        }
        arrDepto.sort((a,b) => {
            if (a.key > b.key) {
                return 1;
            }
            if (a.key < b.key) {
                return -1;
            }
            return 0;
        });
        arrSub.sort((a,b) => {
            if (a.depto > b.depto) {
                return 1;
            }
            if (a.depto < b.depto) {
                return -1;
            }
            return 0;
        });
        arrAction.sort((a,b) => {
            if (a.proceso > b.proceso) {
                return 1;
            }
            if (a.proceso < b.proceso) {
                return -1;
            }
            return 0;
        });
        arrProcess.sort((a, b) => {
            if (a.sub > b.sub) {
                return 1;
            }
            if (a.sub < b.sub) {
                return -1;
            }
            return 0;
        });
        for (let indProcess = 0; indProcess < arrProcess.length; indProcess++) {
            for (let indAction = 0; indAction < arrAction.length; indAction++) {
                if (arrProcess[indProcess].key === arrAction[indAction].proceso) {
                    arrProcess[indProcess].submenu.push(arrAction[indAction]);
                }
            }
        }
        for (let indSub = 0; indSub < arrSub.length; indSub++) {
            for (let indProcess = 0; indProcess < arrProcess.length; indProcess++) {
                if (arrSub[indSub].key === arrProcess[indProcess].sub) {
                    arrSub[indSub].submenu.push(arrProcess[indProcess]);
                }
            }
        }
        for (let indDepto = 0; indDepto < arrDepto.length; indDepto++) {
            for (let indSub = 0; indSub < arrSub.length; indSub++) {
                if (arrDepto[indDepto].key === arrSub[indSub].depto) {
                    arrDepto[indDepto].submenu.push(arrSub[indSub]);
                } else {
                    arrDepto[indDepto].submenu.push([]);
                }
            }
        }
        const usuWork = await workModel.findById(dataUser.usu_trabajador);
        links.push({"menu":arrDepto});
        links.push({"nombre": usuWork.nombre_worker});
        req.body.menu = links;
        next()
    } catch (error) {
        let data = {
            "response": "error",
            "message":error.message
        }
        res.status(403).send(data);
    }
}
module.exports = {
    asureAuth,
    accesoView,
    getPermissions,
}