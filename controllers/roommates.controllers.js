//TRUCAZO
const { response, request } = require('express')
const fs = require('fs');
const { getRandomUser } = require('../helpers/radom_user');
const pathDB = './db/roommates.json';





const readDB = () => {
    try {
        const data = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));
        return data;
    } catch (error) {
        console.log(error);
    }
}

const saveDB = (data) => {
    try {
        fs.writeFileSync(pathDB, JSON.stringify({ roommates: data }));
    } catch (error) {
        console.log(error);
    }
}



//HTTP METHODS
const getRoommates = (req = request, res = response) => {
    try {
        const { roommates } = readDB();
        res.json({ roommates });
    } catch (error) {
        console.log(error);
    }

}

const createRoommate = async(req = request, res = response) => {
    try {
        const roommate = await getRandomUser();
        const { roommates } = readDB();
        roommates.push(roommate);
        saveDB(roommates);
        res.json(JSON.stringify(roommates));
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    getRoommates,
    createRoommate,
}