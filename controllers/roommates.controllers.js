//TRUCAZO
const { response, request } = require('express')
const fs = require('fs');
const { getRandomUser } = require('../helpers/radom_user');
const pathDB = './db/roommates.json';





const readDB = () => {
    const data = JSON.parse(fs.readFileSync(pathDB, 'utf-8'));
    return data;
}

const saveDB = (data) => {
    fs.writeFileSync(pathDB, JSON.stringify({ roommates: data }));

}



//HTTP METHODS
const getRoommates = (req = request, res = response) => {
    try {
        const { roommates } = readDB();
        console.log(roommates);
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