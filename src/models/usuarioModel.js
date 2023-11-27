const moongose = require("mongoose")
const {Schema} = moongose

const usuario = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 15
    },
    passwordHash: {
        type: String,
        required: true,
        trim:true
    }

},{ versionKey: false,
    collection: "Usuarios"    
})

const usuarioModel = moongose.model("Usuarios", usuario)

module.exports = usuarioModel