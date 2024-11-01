const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    usuarioId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    vueloId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vuelo'
    },
    estado:{
        type: String,
        default: 'activo'
    }
});

module.exports = mongoose.model('Reserva', reservaSchema);