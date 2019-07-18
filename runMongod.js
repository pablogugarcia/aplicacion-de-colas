const fs = require('fs');
const exec = require('child_process').execFile;
const path = require('path');

// const mongoPath = path.resolve(__dirname , '')

const fun = function () {
    console.log("fun() start");
    exec('C:/Program Files/MongoDB/Server/4.0/bin/mongod.exe', function (err, data) {
        console.log(err)
        console.log(data.toString(), 'Ejecutado');
    });
    console.log('Ejecutado');
}
fun();