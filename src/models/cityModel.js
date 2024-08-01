const mongo = require("mongoose");
const citySchema = new mongo.Schema({
    iso_code:{
        type: String,
        maxlenght: 3,
        required: true,
        unique: true
    },
    name_city:{
        type: String,
        required: true
    },
    country: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'country'
    }
})
module.exports = mongo.model("city", citySchema);