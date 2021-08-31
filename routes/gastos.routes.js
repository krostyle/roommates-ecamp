const { Router } = require('express');
const { getGastos } = require('../controllers/gastos.controllers');

const router = Router();

router.get('/', getGastos);



module.exports = router;