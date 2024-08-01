const mongo = require("mongoose");
const WorkerSchema = new mongo.Schema({
    cod_worker: {
        type: String,
        required: true,
        unique: true,
        metadata:{
            description: "Se debe ingresar el rut con guión y con el dígito vefificador"
        }
    },
    id_worker:{
        type: Number,
        default: 10000,
        unique: true
    },
    cargo_worker:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'works'
    },
    nombre_worker:{
        type: String,
        required: true,
        unique: true
    },
    direccion_worker:{
        type: String,
        required: true
    },
    state_worker:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'state',
        metadata:{
            description: "Se debe ingresar el código Territorial de la state, cod_territorial"
        }
    },
    fecha_ingreso:{
        type: String,
        default: Date.now
    },
    grado_worker:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'grades'
    },
    depto_worker:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Depto'
    },
    email_worker:{
        type: String,
        required: true,
        unique: true
    },
    fono_worker:{
        type: String,
        required: true
    },
    sub_depto: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: 'SubDepto'
        }
    ],
    estado_worker:{
        type: Boolean,
        default: false
    },
    avatar_worker: {
        type: String,
        default: ""
    }
});

module.exports = mongo.model("Trabajador", WorkerSchema);