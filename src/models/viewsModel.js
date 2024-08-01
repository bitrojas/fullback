const mongo = require("mongoose");
const ViewsSchema = new mongo.Schema({
    view_back:{
        type: String,
        required: true,
        unique: true
    },
    view_front: {
        type: String,
        required: true
    },
    view_accion: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'actions'
    },
    view_sub: {
        type: mongo.Schema.Types.ObjectId,
        ref: 'SubDepto'
    },
    view_process:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'process'
    },
    view_perm:{
        type: Number,
        required: true
    }
})
module.exports = mongo.model("Vistas", ViewsSchema);