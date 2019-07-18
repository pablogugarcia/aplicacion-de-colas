const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');
const { getLastData } = require('../functions/getData');


(async function () {
    let data;
    await getLastData().then((res) => data = res);


    let ticket = new TicketControl(data);


    io.on('connection', (client) => {

        client.on('siguienteTicket', (data, callback) => {
            let siguiente = ticket.siguiente();
            callback(siguiente);
        });

        client.emit('estadoActual', {
            actual: ticket.getUltimoTicket(),
            ultimos4: ticket.getUltimos4()
        });

        client.on('atenderTicket', (data, callback) => {

            if (!data.escritorio) {
                return callback({
                    err: true,
                    mensaje: 'El escritorio es necesario'
                });
            }

            let atenderTicket = ticket.atenderTicket(data.escritorio);
            callback(atenderTicket);

            client.broadcast.emit('ultimos4', {
                ultimos4: ticket.getUltimos4()
            });
        });



    });
})()