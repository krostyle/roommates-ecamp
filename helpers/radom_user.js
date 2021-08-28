//FUNCTIONS RANDOM USERS
const axios = require('axios');
const { v4: uuid } = require('uuid');
const getRandomUser = async() => {
    const url = 'https://randomuser.me/api';
    const { data } = await axios.get(url);
    const { results } = data;
    const randomUser = results[0];
    const roommate = {
        id: uuid(),
        nombre: `${randomUser.name.first} ${randomUser.name.last}`,
        email: randomUser.email,
        debe: 0,
        recibe: 0,
    };
    return roommate;
}

module.exports = {
    getRandomUser
}