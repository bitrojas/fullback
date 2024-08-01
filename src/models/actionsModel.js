const mongo = require("mongoose");
const actionsSchema = new mongo.Schema({
    action:{
        type: String,
        maxlenght: 50,
        required: true
    },
    proceso:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'process'
    },
})
module.exports = mongo.model("actions", actionsSchema);