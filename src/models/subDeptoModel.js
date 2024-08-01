const mongo = require("mongoose");
const SubDeptoSchema = new mongo.Schema({
    depto_code:{
        type: Number,
        maxlenght: 6    ,
        required: true,
        unique: true
    },
    depto_name:{
        type: String,
        maxlenght: 4,
        required: true
    },
    depto:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Depto'
    },
})
module.exports = mongo.model("SubDepto", SubDeptoSchema);