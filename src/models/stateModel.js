const mongo = require("mongoose");
const stateSchema = new mongo.Schema({
    cod_territorial:{
        type: String,
        maxlenght: 5,
        required: true,
        unique: true
    },
    cod_postal:{
        type: Number
    },
    name_state:{
        type: String,
        required: true
    },
    city: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'city'
    },
    cod_sii:{
        type: Number
    }
})
module.exports = mongo.model("state", stateSchema);