const mongo = require("mongoose");
const UsersSchema = new mongo.Schema({
    usu_user:{
        type: String,
        required: true,
        unique: true
    },
    fecha_creacion:{
        type: String
    },
    estado:{
        type: Boolean,
        default: false
    },
    usu_grado:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'grades'
    },
    fecha_modifica:{
        type: String
    },
    usu_pass:{
        type:String,
        require:true
    },
    usu_trabajador:{
        type: mongo.Schema.Types.ObjectId,
        ref: 'Trabajador'
    },
    vistas: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: 'Vistas'
        }
    ]
});

UsersSchema.pre('save', function (next) {
    if (!this.vistas || this.vistas.length === 0) {
        this.vistas = ["login", "home"];
    }
    next();
});

module.exports = mongo.model("users", UsersSchema);