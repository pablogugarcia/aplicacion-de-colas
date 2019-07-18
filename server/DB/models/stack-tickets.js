const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const stackSchema = new Schema({
    ultimo: { type: Number, required: [true, 'Siempre debe hacer un ultimo ticket'] },
    fecha: { type: String, required: [true, 'La fecha es requerida'] },
    tickets: { type: Array, required: false },
    ultimos: { type: Array, required: false }
});

module.exports = model('Stack', stackSchema);