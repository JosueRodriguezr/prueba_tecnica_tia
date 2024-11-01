const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vueloSchema = new Schema({
    origen:{
        type: String
    },
    destino:{
        type: String
    },
    fecha:{
        type: String
    },
    horario:{
        type: String
    },
    disponibilidad:{
        type: Boolean
    },
});

module.exports = mongoose.model('Vuelo', vueloSchema);