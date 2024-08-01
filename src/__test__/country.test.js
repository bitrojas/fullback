/* LOGS */
const log4 = require("log4js");
const logger = log4.getLogger("countryTest.js");
logger.level = "all";

/* BDD */
const mongoose = require('mongoose');


const app = require("../../server");
const request = require('supertest');
const { recompileSchema } = require("../models/worksModel");


afterEach(() => {
  res = null; // Reinicia la respuesta
});

describe('Countries', () => {
    describe('POST ROUTE Country getIdByIso', () => {
        describe('given the countries does not exist', () => {
            test('should return a 406', async () => {
                const res = await request(app)
                    .post('/api/1.0/country/iso')
                    .send({ iso_code: ''});
                expect(res.statusCode).toEqual(404);
            });
            test('should return Error Message', async () => {
                const res = await request(app)
                    .post('/api/1.0/country/iso')
                    .send({ iso_code: 'C9'});
                expect(res.body.message).toEqual("Error al validar el Código ISO");
            });
        });
    });
});