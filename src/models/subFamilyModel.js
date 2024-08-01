const mongo = require("mongoose");
const SubFamilySchema = new mongo.Schema({
    nombre_subfamily:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    family: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Family'
    }
})
module.exports = mongo.model("SubFamily", SubFamilySchema);