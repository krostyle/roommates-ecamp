//TRUCAZO
const { response, request } = require('express')
const axios = require('axios');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const pathDB = './db/gastos.json';





const readDB = () => {
    const data = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));
    console.log(data);
    return data;
}

const saveDB = (data) => {
    fs.writeFileSync(pathDB, JSON.stringify({ gastos: data }));

}





//HTTP METHODS
const getRoommates = (req = request, res = response) => {
    const { roommates } = readDB();
    console.log(roommates);
    res.json({ roommates });
}

const createRoommate = async(req = request, res = response) => {
    const roommate = await getRandomUser(url);
    const { roommates } = readDB();
    roommates.push(roommate);
    saveDB(roommates);
    res.json(JSON.stringify(roommates));
}

const updateSport = async(req = request, res = response) => {
    const { nombre, precio } = req.body;
    const { deportes } = readDB();
    const deportesUpdate = deportes.map((deporte) => {
        if (deporte.nombre === nombre) {
            deporte.precio = precio
        }
        return deporte;
    });
    saveDB(deportesUpdate);
    res.json(JSON.stringify({ nombre, precio }));
}

// const patchUsers = (req = request, res = response) => {
//     res.json({
//         msg: 'Patch API Controller'
//     })
// }

const deleteSport = async(req = request, res = response) => {
    const { nombre, precio } = req.query;
    const { deportes } = readDB();
    const deportesDelete = deportes.filter((deporte) => {
        return deporte.nombre !== nombre;
    });
    saveDB(deportesDelete);
    res.json(JSON.stringify({ nombre, precio }));
}

module.exports = {
    getRoommates,
    createRoommate,
    updateSport,
    deleteSport
}