const mongo = require("mongoose");
const CategorySchema = new mongo.Schema({
    nombre_category:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    subfamily: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'SubFamily'
    }
})
module.exports = mongo.model("Category", CategorySchema);