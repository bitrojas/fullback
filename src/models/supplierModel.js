const mongo = require("mongoose");
const SupplierSchema = new mongo.Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    razon_social:{
        type: String,
        required: true
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: String,
        required: true
    },
    state:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'state'
    },
    fecha_creacion:{
        type: Date
    },
    estado:{
        type: Boolean,
        default: false
    },
    usuario_creacion:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha_modifica:{
        type: Date
    },
    usuario_modificacion:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    fecha_pago:{
        type:String
    },
    forma_pago:{
        type: String
    },
    giro: String,
    url: String,
    descripcion: String
});

module.exports = mongo.model("Proveedor", SupplierSchema);