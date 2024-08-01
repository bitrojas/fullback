const mongo = require("mongoose");
const gradeschema = new mongo.Schema({
    grade:{
        type: Number,
        maxlenght: 3,
        required: true,
        unique: true
    },
    grade_name:{
        type: String,
        required: true
    },
    grade_access : {
        type: Number,
        default: 0,
        maxlenght: 2
    },
    grade_description: {
        type: String,
        maxlength: 150
    }
})
module.exports = mongo.model("grades", gradeschema);