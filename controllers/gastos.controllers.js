//TRUCAZO
const { response, request } = require('express')
const axios = require('axios');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const pathGastos = './db/gastos.json';
const pathRoommates = './db/roommates.json';





const readDB = (path) => {
    try {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const saveDB = (data, path) => {
    try {
        path.includes('gastos') ? fs.writeFileSync(path, JSON.stringify({ gastos: data })) : fs.writeFileSync(path, JSON.stringify({ roommates: data }));
    } catch (error) {
        console.log(error);
    }
}


//UPDATE ROOMMATES
const updateRoommates = async() => {
    const { roommates } = readDB(pathRoommates);
    const { gastos } = readDB(pathGastos);
    const roommateUpdate = roommates.map((r) => {
        r.debe = 0;
        gastos.forEach((g) => {
            if (r.nombre === g.roommate) {
                r.debe = r.debe + g.monto;
            }
        });
        return r;
    });
    saveDB(roommateUpdate, pathRoommates);
}



//HTTP METHODS
const getGastos = (req = request, res = response) => {
    try {
        const { gastos } = readDB(pathGastos);
        res.json({ gastos });
    } catch (error) {
        console.log(error);
    }

}

const createGasto = async(req = request, res = response) => {
    try {
        const { roommates } = readDB(pathRoommates);
        const { gastos } = readDB(pathGastos);
        const { roommate, descripcion, monto } = req.body;
        const newGasto = {
            id: uuid(),
            roommate,
            descripcion,
            monto
        };
        gastos.push(newGasto);
        saveDB(gastos, pathGastos);
        updateRoommates();
        res.end();
    } catch (error) {
        console.log(error);
    }
}

const updateGasto = async(req = request, res = response) => {
    const { id } = req.query;
    const { gastos } = readDB(pathGastos);
    const gastoUpdate = gastos.map((gasto) => {
        if (gasto.id === id) {
            gasto.roommate = req.body.roommate;
            gasto.descripcion = req.body.descripcion;
            gasto.monto = req.body.monto;
        }
        return gasto;
    });
    saveDB(gastoUpdate, pathGastos);
    updateRoommates();
    res.end();
    // res.json(JSON.stringify({ nombre, precio }));
}



const deleteGasto = async(req = request, res = response) => {
    const { id } = req.query;
    const { gastos } = readDB(pathGastos);
    const gastoDelete = gastos.filter((gasto) => {
        return gasto.id !== id;
    });
    saveDB(gastoDelete, pathGastos);
    updateRoommates();
    res.end();

}

module.exports = {
    getGastos,
    createGasto,
    updateGasto,
    deleteGasto
}