const mongo = require("mongoose");
const workschema = new mongo.Schema({
    cod_cargo:{
        type: String,
        required: true,
        unique: true,
        min: 100000000000,
        max: 999999999999
    },
    name_cargo:{
        type: String,
        required: true
    },
    cargo_description: {
        type: String,
        maxLength:500
    },
    cargo_functions: {
        type: String,
        maxLength:500
    },
    depto: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Depto'
    },
    sub_depto: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'SubDepto'
    },
    cargo_status: {
        type: Boolean,
        default: true
    }
})
module.exports = mongo.model("works", workschema);