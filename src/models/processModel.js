const mongo = require("mongoose");
const processSchema = new mongo.Schema({
    process:{
        type: String,
        maxlenght: 150,
        required: true
    },
    sub_depto:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'SubDepto'
    },
})
module.exports = mongo.model("process", processSchema);