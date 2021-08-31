const { Router } = require('express');
const { createGasto, updateGasto, deleteGasto } = require('../controllers/gastos.controllers');

const router = Router();

router.post('/', createGasto)

router.put('/', updateGasto)

router.delete('/', deleteGasto)



module.exports = router;