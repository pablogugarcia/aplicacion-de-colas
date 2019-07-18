const Stack = require('../DB/models/stack-tickets');


class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
// TODO: Guardar tickes en db


class TicketControl {

    constructor(data) {

        console.log(data, ' data del constructor ');
        data ? this.checkData(data) : data = { ultimo: 0, fecha: new Date().getDate() };
        if (!data.ultimo) {
            data.ultimo = 0;
        }
        this.ultimo = data.ultimo;
        this.hoy = new Date().getDate();
        this.tickets = data.tickets || [];
        this.ultimos4 = data.ultimos || [];

    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.grabarDatos();
        console.log('ultimo en siguiente vale', this.ultimo);
        return `Ticket ${this.ultimo}`;
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets pendientes'
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // borra el ultimo
        }

        console.log('Ultimos 4', this.ultimos4);

        this.grabarDatos();

        return atenderTicket;
    }

    checkData(dataCheck) {

        let data = dataCheck;
        if (data) {
            if (data.fecha === String(this.hoy)) {
                console.log('Ya se abrio el sistema');
                this.ultimo = data.ultimo || 0;
                // this.tickets = data.tickets;
            } else {
                this.reiniciarConteo();
            }
        } else {
            console.log('No hay data');
        }
    }

    /*     async getData() {
            let data;
            await Stack.find({}, (err, dataDB) => {
                if (err) { return console.log(err); }
                data = dataDB;
            });
            if (!data) return [];
    
            return data;
        }
    
     */
    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }
    getUltimos4() {
        return this.ultimos4;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];
        console.log('Se ha inicializado el sistema');
        this.grabarDatos();

    }

    grabarDatos() {

        if (!this.hoy) { this.hoy = new Date().getDate() }
        let stackNew = new Stack({
            ultimo: this.ultimo,
            fecha: String(this.hoy),
            tickets: this.tickets,
            ultimos: this.ultimos4
        });

         if (this.ultimo == 0) { return console.log('Ultimo no se actualizo'); }
        stackNew.save((err, stackDB) => {
            if (err) return new Error(err);
            if (!stackDB) return new Error(' Ups algo paso, stack empty');

            console.log('Ticket guardado');
        });
    }


}

module.exports = { TicketControl }