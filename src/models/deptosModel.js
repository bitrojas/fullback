const mongo = require("mongoose");
const DeptoSchema = new mongo.Schema({
    depto_code:{
        type: Number,
        maxlenght: 4,
        required: true,
        unique: true
    },
    depto_name:{
        type: String,
        required: true
    }
})
module.exports = mongo.model("Depto", DeptoSchema);