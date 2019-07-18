const Stack = require('../DB/models/stack-tickets');

async function getData() {
    let data;
    await Stack.find({})
        .exec((err, dataDB) => {
            if (err) { return console.log(err); }
            data = dataDB;
        });
    if (!data) return [];

    return data;
}
const getLastData = () => {

    return new Promise((resolve, reject) => {

        Stack.find({})
            .exec(function (err, dataDB) {
                if (err) { reject(console.log(err)); }
                if (dataDB.length == 0) { return resolve(dataDB) }
                resolve(dataDB[dataDB.length - 1]);
            });

    });

}

module.exports = {
    getLastData
}