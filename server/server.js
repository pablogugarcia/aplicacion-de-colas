require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT;

// connect to a Data Base
(async function () {
    await require('../server/DB/connect').connect(process.env.URL_DB);


    // IO = esta es la comunicacion del backend
    let server = http.createServer(app);
    module.exports.io = socketIO(server);
    require('./sockets/socket');

    app.use(express.static(publicPath));


    //  server.listen(port, '192.168.0.227',  (err) => {F


    server.listen(port, (err) => {

        if (err) throw new Error(err);

        console.log(`Servidor corriendo en puerto ${port}`);

    });
})()
