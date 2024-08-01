const mongo = require("mongoose");
const FamilySchema = new mongo.Schema({
    nombre_familia:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    }
})
module.exports = mongo.model("Family", FamilySchema);