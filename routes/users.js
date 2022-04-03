const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')

router.get('/cadastrar', usersController.formRegister)
router.post('/cadastrar', usersController.registerUser)

module.exports = router;
