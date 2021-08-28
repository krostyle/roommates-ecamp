const express = require('express');
const cors = require('cors');
const fs = require('fs');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.roommatesPath = '/';
        this.gastosPath = '/gastos';

        //MIDDLEWARE
        this.middleware();

        //ROUTES
        this.routes();

        //CREATE DB
        this.readDB();

    }

    middleware() {
        //CORS
        this.app.use(cors());

        //LECTURA Y PARSEO DEL BODY
        this.app.use(express.json());

        //DIRECTORIO PUBLICO
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.roommatesPath, require('../routes/roommates.routes'));
        this.app.use(this.gastosPath, require('../routes/gastos.routes'));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port: ' + this.port);
        });
    }

    readDB() {
        const baseRoommates = {
            roommates: []
        }
        const baseGastos = {
            gastos: []
        }
        const pathRoommates = './db/roommates.json';
        const pathGastos = './db/gastos.json';
        if (!fs.existsSync(pathRoommates)) {
            fs.writeFileSync(pathRoommates, JSON.stringify(baseRoommates));
        }
        if (!fs.existsSync(pathGastos)) {
            fs.writeFileSync(pathGastos, JSON.stringify(baseGastos));
        }
    }
}


module.exports = Server;