const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const ticketSchema = new Schema({
    numero: { type: String, required: true },
    escritorio: { type: String, required : false},
    // fecha: { type: String, required: true, default: new Date() },
    // disponible: { type: Boolean, required: true, default: true },
    // descripcion: { type: String, required: false }
});

module.exports = model('Ticket', ticketSchema);