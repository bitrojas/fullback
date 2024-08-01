const mongo = require("mongoose");
const ProductsSchema = new mongo.Schema({
    marca: {
        type: String,
        required: true
    },
    nombre_product:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'Category'
    }
})
module.exports = mongo.model("Products", ProductsSchema);