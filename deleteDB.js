const mongoose = require('mongoose');
const Stack = require('./server/DB/models/stack-tickets');

async function connect(db) {
    mongoose.connect(db,
        { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
            if (err) throw err;
            console.log(`Base de datos Online`);
        });
}

(async function () {
    await connect('mongodb://localhost:27017/socket-ticket');
    await Stack.deleteMany({}, (err) => {
        if (err) return console.log('No se pudo borrar');

    });
    console.log('Datos borrados... desconectando ..');
    mongoose.disconnect();
})()

