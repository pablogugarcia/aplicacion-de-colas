const mongoose = require('mongoose');

 function connect(db) {
    return mongoose.connect(db,
        { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
            if (err) throw err;
            console.log(`Base de datos Online`);

        });

}

module.exports = {
    connect
}