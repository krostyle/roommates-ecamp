const { Router } = require('express');
const { getRoommates, createRoommate, updateSport, deleteSport } = require('../controllers/roommates.controllers');

const router = Router();

router.get('/roommates', getRoommates)

router.post('/roommate', createRoommate)

module.exports = router;